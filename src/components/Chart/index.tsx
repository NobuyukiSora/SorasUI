import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { Typograph } from '../Typograph';
import { Metrics, themeColors } from '../../theme';
import { useCurrency } from '../../tools/currency/currencyContext';
import { createStyles } from './styles';

const AnimatedPath = Animated.createAnimatedComponent(Path);
type RangeType = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'CUSTOM';
export type Interval = '1H' | '4H' | '1D' | '1W';

interface ChartDataPoint {
  label: string;
  fullKey: string;
  value: number;
}

interface SalesChartCardProps {
  transactions: any[];
  range: { start: Date; end: Date };
  selectedInterval: Interval;
  selectedRange: RangeType;
  onIntervalChange: (interval: Interval) => void;
  currentDateRange: string;
  lastPeriodTotal: number;
}

const CARD_CHART_HEIGHT = 150;
const CARD_PADDING = Metrics[16];
const CHART_BAR_HORIZONTAL_PADDING = Metrics[16];
const POINT_SIZE = Metrics[12];
const LABEL_HEIGHT = Metrics[40];
const BAR_GAP = Metrics[8];

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => (
  <Typograph
    style={{ fontSize: size, color: themeColors.text, fontFamily: 'System' }}
  >
    {name === 'expand' ? '⛶' : '✕'}
  </Typograph>
);

export const SalesChartCard: React.FunctionComponent<SalesChartCardProps> = ({
  transactions,
  range,
  selectedInterval,
  onIntervalChange,
  selectedRange,
  currentDateRange,
  lastPeriodTotal,
}) => {
  const { formatCurrency } = useCurrency();
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [actualChartWidth, setActualChartWidth] = React.useState(0);
  const chartDataProgress = useSharedValue(0);

  const chartData = React.useMemo(() => {
    const dataMap: { [key: string]: number } = {};

    transactions.forEach((tx) => {
      const date = tx.createdAt?.toDate ? tx.createdAt.toDate() : tx.createdAt;
      const time = moment(date);
      let key = '';

      if (selectedInterval === '1H') key = time.format('YYYY-MM-DD HH:00');
      else if (selectedInterval === '4H') {
        const block = Math.floor(time.hour() / 4) * 4;
        key = time.format(`YYYY-MM-DD ${block}:00`);
      } else if (selectedInterval === '1D') key = time.format('YYYY-MM-DD');
      else if (selectedInterval === '1W')
        key = `Year-${time.isoWeekYear()}-W${time.isoWeek()}`;

      dataMap[key] = (dataMap[key] || 0) + (tx.totalAmount || 0);
    });

    const points: ChartDataPoint[] = [];
    let current = moment(range.start).startOf(
      selectedInterval === '1H' || selectedInterval === '4H' ? 'hour' : 'day'
    );
    const end = moment(range.end).endOf('day');

    while (current.isSameOrBefore(end)) {
      let key = '';
      let displayLabel = '';

      if (selectedInterval === '1H') {
        key = current.format('YYYY-MM-DD HH:00');
        displayLabel = current.format('HH:00');
      } else if (selectedInterval === '4H') {
        const block = Math.floor(current.hour() / 4) * 4;
        key = current.format(`YYYY-MM-DD ${block}:00`);
        displayLabel = `${block}:00`;
      } else if (selectedInterval === '1D') {
        key = current.format('YYYY-MM-DD');
        displayLabel = current.format('DD/MM');
      } else if (selectedInterval === '1W') {
        key = `Year-${current.isoWeekYear()}-W${current.isoWeek()}`;
        displayLabel = `W${current.isoWeek()}`;
      }

      if (!points.find((p) => p.fullKey === key)) {
        points.push({
          label: displayLabel,
          fullKey: key,
          value: dataMap[key] || 0,
        });
      }

      if (selectedInterval === '1H') current.add(1, 'hour');
      else if (selectedInterval === '4H') current.add(4, 'hours');
      else if (selectedInterval === '1D') current.add(1, 'day');
      else if (selectedInterval === '1W') current.add(1, 'week');
    }

    return {
      data: points,
      currentTotal: points.reduce((sum, p) => sum + p.value, 0),
    };
  }, [transactions, selectedInterval, range]);

  const { data, currentTotal } = chartData;
  const maxDataValue = Math.max(...data.map((d) => d.value), 1);
  const totalPoints = data.length;
  const shouldScroll = totalPoints > 7;

  const currentChartHeight = isFullScreen
    ? SCREEN_HEIGHT -
      (SCREEN_HEIGHT * (SCREEN_WIDTH > SCREEN_HEIGHT ? 0.5 : 0.3) +
        insets.bottom +
        insets.top)
    : CARD_CHART_HEIGHT;

  const TOP_PADDING = Metrics[30];
  const PLOTTING_AREA_HEIGHT = currentChartHeight - TOP_PADDING - LABEL_HEIGHT;

  React.useEffect(() => {
    chartDataProgress.value = 0;
    chartDataProgress.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [chartData, isFullScreen, chartDataProgress]);

  const styles = React.useMemo(
    () =>
      createStyles(
        Metrics,
        themeColors,
        CARD_PADDING,
        POINT_SIZE,
        LABEL_HEIGHT
      ),
    []
  );

  const horizontalSafePadding = isFullScreen ? insets.left + insets.right : 0;
  const usableWidth =
    (actualChartWidth || SCREEN_WIDTH - Metrics[30]) - horizontalSafePadding;

  const BAR_WIDTH = shouldScroll
    ? Metrics[30]
    : (usableWidth -
        2 * CHART_BAR_HORIZONTAL_PADDING -
        BAR_GAP * (totalPoints - 1)) /
      totalPoints;

  const getCurvedPath = (
    points: { x: number; y: number }[],
    closed = false
  ) => {
    if (points.length < 2 || !points[0]) return '';

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      if (p1 && p2) {
        const controlX = (p1!.x + p2!.x) / 2;
        d += ` C ${controlX} ${p1!.y}, ${controlX} ${p2!.y}, ${p2!.x} ${p2!.y}`;
      }
    }

    if (closed) {
      const lastPoint = points[points.length - 1];
      const firstPoint = points[0];

      if (lastPoint && firstPoint) {
        d += ` L ${lastPoint.x} ${currentChartHeight - LABEL_HEIGHT}`;
        d += ` L ${firstPoint.x} ${currentChartHeight - LABEL_HEIGHT} Z`;
      }
    }
    return d;
  };

  const chartPoints = React.useMemo(() => {
    return data.map((item, index) => {
      const valueRatio = item.value / maxDataValue;
      const xCenter =
        CHART_BAR_HORIZONTAL_PADDING +
        index *
          (BAR_WIDTH +
            (shouldScroll ? CHART_BAR_HORIZONTAL_PADDING : BAR_GAP)) +
        BAR_WIDTH / 2;
      const yPos = TOP_PADDING + PLOTTING_AREA_HEIGHT * (1 - valueRatio);
      return { x: xCenter, y: yPos, value: item.value };
    });
  }, [
    data,
    maxDataValue,
    BAR_WIDTH,
    shouldScroll,
    TOP_PADDING,
    PLOTTING_AREA_HEIGHT,
  ]);

  const linePath = getCurvedPath(chartPoints);
  const areaPath = getCurvedPath(chartPoints, true);

  const animatedLineProps = useAnimatedProps(() => ({
    opacity: interpolate(chartDataProgress.value, [0, 0.5], [0, 1]),
  }));

  const animatedAreaProps = useAnimatedProps(() => ({
    opacity: interpolate(chartDataProgress.value, [0.4, 1], [0, 0.4]),
  }));

  const scrollContentWidth = shouldScroll
    ? totalPoints * BAR_WIDTH +
      (totalPoints - 1) * CHART_BAR_HORIZONTAL_PADDING +
      2 * CHART_BAR_HORIZONTAL_PADDING
    : usableWidth;

  return (
    <View
      style={
        isFullScreen
          ? [
              styles.fullScreenCard,
              {
                width: '100%',
                height: SCREEN_HEIGHT,
              },
            ]
          : styles.card
      }
    >
      <View
        style={[
          isFullScreen ? styles.fullScreenHeader : styles.header,
          { paddingHorizontal: isFullScreen ? insets.left + Metrics[16] : 0 },
        ]}
      >
        <View style={{ alignItems: 'baseline' }}>
          <Typograph
            customStyle={[
              styles.currentTotal,
              {
                color:
                  currentTotal >= lastPeriodTotal
                    ? themeColors.green
                    : themeColors.red,
              },
            ]}
          >
            {currentTotal >= lastPeriodTotal ? '▲' : '▼'}
            {formatCurrency(Math.abs(currentTotal - lastPeriodTotal))}
          </Typograph>
          <Typograph customStyle={styles.lastPeriod}>
            {selectedRange}
            {` ${formatCurrency(lastPeriodTotal)}`}
          </Typograph>
        </View>
        <View style={{ flexDirection: 'row', gap: Metrics[8] }}>
          <Typograph customStyle={styles.dateRange}>
            {currentDateRange}
          </Typograph>
          <TouchableOpacity onPress={() => setIsFullScreen(!isFullScreen)}>
            <Icon name={isFullScreen ? 'close' : 'expand'} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.rowBetween,
          {
            paddingHorizontal: isFullScreen ? insets.left + Metrics[16] : 0,
            marginBottom: Metrics[8],
          },
        ]}
      >
        <View style={styles.selectorContainer}>
          {(['1H', '4H', '1D', '1W'] as const).map((interval) => (
            <TouchableOpacity
              key={interval}
              style={[
                styles.selectorButton,
                selectedInterval === interval && styles.selectorButtonActive,
              ]}
              onPress={() => onIntervalChange(interval)}
            >
              <Typograph customStyle={[styles.selectorText]}>
                {interval}
              </Typograph>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.chartArea,
          {
            height: currentChartHeight,
            marginHorizontal: isFullScreen ? insets.left : 0,
          },
        ]}
        onLayout={(e) => setActualChartWidth(e.nativeEvent.layout.width)}
      >
        <ScrollView
          horizontal={shouldScroll}
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: isFullScreen ? 0 : -CARD_PADDING }}
          contentContainerStyle={{
            paddingHorizontal: isFullScreen ? 0 : CARD_PADDING,
          }}
        >
          <View
            style={{ width: scrollContentWidth, height: currentChartHeight }}
          >
            <View
              style={[
                styles.chartBarsRowContainer,
                {
                  height: PLOTTING_AREA_HEIGHT,
                  top: TOP_PADDING,
                  paddingHorizontal: CHART_BAR_HORIZONTAL_PADDING,
                },
              ]}
            >
              {data.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: BAR_WIDTH,
                    height: '100%',
                    backgroundColor: isFullScreen
                      ? themeColors.backgroundSecondary
                      : themeColors.background,
                    borderRadius: Metrics[8],
                    marginRight:
                      i === data.length - 1
                        ? 0
                        : shouldScroll
                          ? CHART_BAR_HORIZONTAL_PADDING
                          : BAR_GAP,
                  }}
                />
              ))}
            </View>

            <Svg style={[StyleSheet.absoluteFill, { zIndex: 10 }]}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop
                    offset="0"
                    stopColor={themeColors.active}
                    stopOpacity="1"
                  />
                  <Stop
                    offset="1"
                    stopColor={themeColors.active}
                    stopOpacity="0"
                  />
                </LinearGradient>
              </Defs>
              <AnimatedPath
                d={areaPath}
                fill="url(#grad)"
                animatedProps={animatedAreaProps}
              />
              <AnimatedPath
                d={linePath}
                stroke={themeColors.active}
                strokeWidth={3}
                fill="none"
                animatedProps={animatedLineProps}
              />
            </Svg>

            <View
              style={[
                StyleSheet.absoluteFill,
                { zIndex: 20, pointerEvents: 'none' },
              ]}
            >
              {chartPoints.map((p, i) => (
                <React.Fragment key={i}>
                  <View
                    style={[
                      styles.chartPoint,
                      { left: p.x - POINT_SIZE / 2, top: p.y - POINT_SIZE / 2 },
                    ]}
                  />
                  {isFullScreen && p.value > 0 && (
                    <Typograph
                      customStyle={[
                        styles.valueLabel,
                        { left: p.x - 40, top: p.y - 22 },
                      ]}
                    >
                      {formatCurrency(p.value)}
                    </Typograph>
                  )}
                </React.Fragment>
              ))}
            </View>

            <View
              style={[
                styles.chartLabelsRow,
                { width: scrollContentWidth, zIndex: 30 },
              ]}
            >
              {data.map((item, i) => {
                const point = chartPoints[i];

                if (!point) return null;

                return (
                  <View
                    key={i}
                    style={{
                      position: 'absolute',
                      left: point.x - 20,
                      width: 40,
                      alignItems: 'center',
                    }}
                  >
                    <Typograph customStyle={styles.chartLabelText}>
                      {item.label}
                    </Typograph>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
