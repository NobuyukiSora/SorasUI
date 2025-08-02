import moment from 'moment';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import IconBack from '../../Icon/Ico-Back.svg';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import { PropsCalendar } from './props';

const DateItem: React.FunctionComponent<{
  day: number;
  isDotStart: boolean;
  isDotEnd: boolean;
  isDotInRange: boolean;
  onPress: () => void;
  customSelectedDot?: React.ReactNode;
  customRangeDot?: React.ReactNode;
  customizeSelectedTextStyles?: object;
  customDateTextStyles?: object;
  getSundays: number;
  styles: any;
}> = ({
  day,
  isDotStart,
  isDotEnd,
  isDotInRange,
  onPress,
  customSelectedDot,
  customRangeDot,
  customizeSelectedTextStyles,
  customDateTextStyles,
  getSundays,
  styles,
}) => {
  const selectedDotScale = useSharedValue(0);
  const selectedDotOpacity = useSharedValue(0);
  const rangeDotScale = useSharedValue(0);
  const rangeDotOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (isDotStart || isDotEnd) {
      selectedDotScale.value = withSpring(1, { damping: 10, stiffness: 100 });
      selectedDotOpacity.value = withTiming(1, { duration: 300 });
      rangeDotScale.value = withTiming(0);
      rangeDotOpacity.value = withTiming(0);
    } else if (isDotInRange) {
      rangeDotScale.value = withSpring(1, { damping: 10, stiffness: 100 });
      rangeDotOpacity.value = withTiming(1, { duration: 300 });
      selectedDotScale.value = withTiming(0);
      selectedDotOpacity.value = withTiming(0);
    } else {
      selectedDotScale.value = withTiming(0);
      selectedDotOpacity.value = withTiming(0);
      rangeDotScale.value = withTiming(0);
      rangeDotOpacity.value = withTiming(0);
    }
  }, [
    isDotStart,
    isDotEnd,
    isDotInRange,
    rangeDotOpacity,
    rangeDotScale,
    selectedDotOpacity,
    selectedDotScale,
  ]);

  const animatedSelectedDotStyle = useAnimatedStyle(() => {
    return {
      opacity: selectedDotOpacity.value,
      transform: [{ scale: selectedDotScale.value }],
    };
  });

  const animatedRangeDotStyle = useAnimatedStyle(() => {
    return {
      opacity: rangeDotOpacity.value,
      transform: [{ scale: rangeDotScale.value }],
    };
  });

  return (
    <TouchableOpacity style={styles.daysContainer} onPress={onPress}>
      {isDotStart || isDotEnd ? (
        <View style={styles.daysContainer}>
          <Animated.View
            style={[{ position: 'absolute' }, animatedSelectedDotStyle]}
          >
            {!!customSelectedDot ? (
              customSelectedDot
            ) : (
              <View style={styles.selectedDot}></View>
            )}
          </Animated.View>
          <Typograph
            style={[
              styles.daysText,
              {
                color: themeColors.white,
              },
              customDateTextStyles,
              customizeSelectedTextStyles,
            ]}
          >
            {day}
          </Typograph>
        </View>
      ) : isDotInRange ? (
        <View style={styles.daysContainer}>
          <Animated.View
            style={[{ position: 'absolute' }, animatedRangeDotStyle]}
          >
            {!!customRangeDot ? (
              customRangeDot
            ) : (
              <View style={styles.rangeDot}></View>
            )}
          </Animated.View>
          <Typograph
            style={[
              styles.daysText,
              {
                color: day === getSundays ? themeColors.red : themeColors.text,
              },
              customDateTextStyles,
            ]}
          >
            {day}
          </Typograph>
        </View>
      ) : (
        <View>
          <Typograph
            style={[
              styles.daysText,
              {
                color: day === getSundays ? themeColors.red : themeColors.text,
              },
              customDateTextStyles,
            ]}
          >
            {day}
          </Typograph>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const Calendar: React.FunctionComponent<PropsCalendar> = (props) => {
  const {
    width = 300,
    height = 300,
    valueStartDate,
    valueEndDate,
    getDatesRange = false,
    setYearPosition = 0,
    setMonthPosition = -1,
    dateRangeValue = () => {},
    onPressDate = () => {},
    customSelectedDot,
    customRangeDot,
    customizeSelectedTextStyles,
    customWeekTextStyles,
    customDateTextStyles,
    customTitleHeader,
    customStyles = {
      weekType: 'short',
      showLastNextDate: true,
    },
  } = props;

  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );
  const [startDate, setStartDate] = React.useState<string>(
    moment().format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = React.useState<string>();
  const [startData, setStartData] = React.useState<{
    day: number;
    month: number;
    year: number;
  } | null>();
  const [endData, setEndData] = React.useState<{
    day: number;
    month: number;
    year: number;
  } | null>();
  const [isSelectedStart, setIsSelectedStart] = React.useState(false);

  const lastDate = new Date(
    !!setYearPosition ? setYearPosition : currentYear,
    (setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1,
    0
  ).getDate();
  const firstDay = new Date(
    !!setYearPosition ? setYearPosition : currentYear,
    setMonthPosition >= 0 ? setMonthPosition : currentMonth,
    1
  ).getDay();

  const datesArray = Array.from({ length: lastDate }, (_, index) => index + 1);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = {
    long: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    supaShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  };

  React.useEffect(() => {
    if (valueStartDate) {
      setStartDate(moment(valueStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    }
    if (valueEndDate) {
      setEndDate(moment(valueEndDate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    }
  }, [valueStartDate, valueEndDate]);

  React.useEffect(() => {
    if (currentMonth < 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else if (currentMonth > 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    }
  }, [currentMonth, currentYear]);

  React.useEffect(() => {
    if (startDate) {
      const dateStart = moment(startDate, 'YYYY-MM-DD');
      setStartData({
        day: Number(dateStart.format('D')),
        month: Number(dateStart.format('M')),
        year: Number(dateStart.format('YYYY')),
      });
    } else {
      setStartData(null);
    }

    if (endDate) {
      const dateEnd = moment(endDate, 'YYYY-MM-DD');
      setEndData({
        day: Number(dateEnd.format('D')),
        month: Number(dateEnd.format('M')),
        year: Number(dateEnd.format('YYYY')),
      });
    } else {
      setEndData(null);
    }
  }, [startDate, endDate]);

  const weekLoop = () => {
    let weekCount = 0;
    const weekView = [];
    do {
      weekView.push(
        <View style={styles.daysContainer} key={weekCount}>
          <Typograph
            style={[
              styles.daysText,
              { color: weekCount === 0 ? themeColors.red : themeColors.text },
              customWeekTextStyles,
            ]}
          >
            {customStyles.weekType === 'short'
              ? daysOfWeek.short[weekCount]
              : customStyles.weekType === 'supaShort'
                ? daysOfWeek.supaShort[weekCount]
                : daysOfWeek.long[weekCount]}
          </Typograph>
        </View>
      );
      weekCount++;
    } while (weekCount < daysOfWeek.long.length);
    return weekView;
  };

  const lastMonthDatesLoop = () => {
    const datesView = [];

    if (customStyles.showLastNextDate) {
      const lastMonthIndex =
        (setMonthPosition >= 0 ? setMonthPosition : currentMonth) - 1 < 0
          ? 11
          : (setMonthPosition >= 0 ? setMonthPosition : currentMonth) - 1;
      const getYearForLastMonth =
        (setMonthPosition >= 0 ? setMonthPosition : currentMonth) - 1 < 0
          ? (!!setYearPosition ? setYearPosition : currentYear) - 1
          : !!setYearPosition
            ? setYearPosition
            : currentYear;
      const lastMonthDatesCountTotal = new Date(
        getYearForLastMonth,
        lastMonthIndex + 1,
        0
      ).getDate();
      let lastMonthDatesStart = lastMonthDatesCountTotal - (firstDay - 1);

      if (firstDay !== 0) {
        for (let i = lastMonthDatesStart; i <= lastMonthDatesCountTotal; i++) {
          datesView.push(
            <View style={styles.daysContainer} key={`last-month-${i}`}>
              <Typograph
                style={[styles.daysText, { color: themeColors.inActive }]}
              >
                {i}
              </Typograph>
            </View>
          );
        }
      }
    } else {
      if (firstDay !== 0) {
        for (let i = 0; i < firstDay; i++) {
          datesView.push(
            <View style={styles.daysContainer} key={`empty-${i}`} />
          );
        }
      }
    }
    return datesView;
  };

  const selectedStartandEnd = (item: number) => {
    const selectedDateMoment = moment(
      `${!!setYearPosition ? setYearPosition : currentYear}-${(setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1}-${item}`,
      'YYYY-M-D'
    );
    const formattedSelectedDate = selectedDateMoment.format('YYYY-MM-DD');

    if (getDatesRange) {
      if (!isSelectedStart || !startDate) {
        setStartDate(formattedSelectedDate);
        setEndDate(undefined);
        setIsSelectedStart(true);
        dateRangeValue({
          start: formattedSelectedDate,
          end: undefined,
        });
      } else {
        let newStartDate = startDate;
        let newEndDate = formattedSelectedDate;

        if (moment(formattedSelectedDate).isBefore(moment(startDate))) {
          newStartDate = formattedSelectedDate;
          newEndDate = startDate;
        }

        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setIsSelectedStart(false);
        dateRangeValue({
          start: newStartDate,
          end: newEndDate,
        });
      }
    } else {
      setStartDate(formattedSelectedDate);
      setEndDate(undefined);
      onPressDate(formattedSelectedDate);
      setIsSelectedStart(false);
    }
  };

  const datesLoop = () =>
    datesArray.map((item) => {
      const currentDayMoment = moment(
        `${currentYear}-${months[currentMonth]}-${item}`,
        'YYYY-MMMM-D'
      );
      const formattedCurrentDay = currentDayMoment.format('YYYY-MM-DD');

      const dotStart =
        item === startData?.day &&
        (setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1 ===
          startData?.month &&
        (!!setYearPosition ? setYearPosition : currentYear) === startData?.year;

      const dotEnd =
        item === endData?.day &&
        (setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1 ===
          endData?.month &&
        (!!setYearPosition ? setYearPosition : currentYear) === endData?.year;

      const dotInRange = moment(formattedCurrentDay).isBetween(
        moment(startDate, 'YYYY-MM-DD'),
        moment(endDate, 'YYYY-MM-DD'),
        'day',
        '[]'
      );

      const isSunday = currentDayMoment.day() === 0;

      return (
        <DateItem
          key={item}
          day={item}
          isDotStart={dotStart}
          isDotEnd={dotEnd}
          isDotInRange={dotInRange}
          onPress={() => selectedStartandEnd(item)}
          customSelectedDot={customSelectedDot}
          customRangeDot={customRangeDot}
          customizeSelectedTextStyles={customizeSelectedTextStyles}
          customDateTextStyles={customDateTextStyles}
          getSundays={isSunday ? item : -1}
          styles={styles}
        />
      );
    });

  const nextMonthDatesLoop = () => {
    const datesView = [];
    const totalDaysInGrid = 42;
    const currentMonthDays = lastDate;
    const previousMonthEmptyDays = firstDay;
    const filledDays = currentMonthDays + previousMonthEmptyDays;
    const remainingDates = totalDaysInGrid - filledDays;

    if (customStyles.showLastNextDate && remainingDates > 0) {
      for (let i = 1; i <= remainingDates; i++) {
        datesView.push(
          <View style={styles.daysContainer} key={`next-month-${i}`}>
            <Typograph
              style={[styles.daysText, { color: themeColors.inActive }]}
            >
              {i}
            </Typograph>
          </View>
        );
      }
    } else if (!customStyles.showLastNextDate && remainingDates > 0) {
      for (let i = 0; i < remainingDates; i++) {
        datesView.push(
          <View style={styles.daysContainer} key={`empty-next-${i}`} />
        );
      }
    }
    return datesView;
  };

  const styles = StyleSheet.create({
    daysText: {
      textAlign: 'center',
    },
    daysContainer: {
      height: (height - 50) / 7,
      width: width / 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateContainer: {
      width: width,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    calendarContainer: {
      width: width,
      height: height,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: Metrics[4],
      alignItems: 'center',
      paddingHorizontal: Metrics[4],
      height: 50,
    },
    titleText: {
      textAlign: 'center',
      fontSize: Metrics[16],
      color: themeColors.text,
    },
    selectedDot: {
      borderRadius: Metrics[16],
      height: 25,
      width: 25,
      backgroundColor: themeColors.red,
      padding: Metrics[4],
    },
    rangeDot: {
      width: 25,
      height: 2,
      backgroundColor: themeColors.red,
    },
  });

  return (
    <View style={styles.calendarContainer}>
      {!!customTitleHeader ? (
        customTitleHeader
      ) : (
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => setCurrentMonth(currentMonth - 1)}>
            <IconBack stroke={themeColors.text} height={15} width={15} />
          </TouchableOpacity>
          <View>
            <Typograph style={[styles.titleText, { fontWeight: '800' }]}>
              {months[currentMonth]}
            </Typograph>
            <Typograph style={[styles.titleText, { fontSize: Metrics[12] }]}>
              {currentYear}
            </Typograph>
          </View>
          <TouchableOpacity
            onPress={() => setCurrentMonth(currentMonth + 1)}
            style={{ transform: [{ rotate: '180deg' }] }}
          >
            <IconBack stroke={themeColors.text} height={15} width={15} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.dateContainer}>
        {weekLoop()}
        {lastMonthDatesLoop()}
        {datesLoop()}
        {nextMonthDatesLoop()}
      </View>
    </View>
  );
};
