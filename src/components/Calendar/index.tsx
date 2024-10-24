import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { DynamicScrollView } from '../DynamicScrollView';
import { Typograph } from '../Typograph';
import { PropsCalendar } from './props';
import moment from 'moment';
import IconBack from '../../Icon/Ico-Back.svg';

export const Calendar: React.FunctionComponent<PropsCalendar> = (props) => {
  const {
    width = 300,
    height = 300,
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
  const [startDate, setStartDate] = React.useState('');
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
  const [endDate, setEndDate] = React.useState('');
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
  let getSundays = firstDay == 0 ? firstDay + 1 : 7 - firstDay + 1;
  let dotInRange = false;

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
    if (currentMonth < 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else if (currentMonth > 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    }
  }, [currentMonth, currentYear]);

  React.useEffect(() => {
    const dateStart = moment(startDate, 'D/M/YYYY');
    setStartData({
      day: Number(dateStart.format('D')),
      month: Number(dateStart.format('M')),
      year: Number(dateStart.format('YYYY')),
    });

    const dateEnd = moment(endDate, 'D/M/YYYY');
    setEndData({
      day: Number(dateEnd.format('D')),
      month: Number(dateEnd.format('M')),
      year: Number(dateEnd.format('YYYY')),
    });
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
              { color: weekCount == 0 ? themeColors.red : themeColors.text },
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
      const lastMonth =
        (setMonthPosition >= 0 ? setMonthPosition : currentMonth) - 1 < 0
          ? 11
          : (setMonthPosition >= 0 ? setMonthPosition : currentMonth) - 1;
      const getYear =
        (setMonthPosition >= 0 ? setMonthPosition : currentMonth) - 1 < 0
          ? (!!setYearPosition ? setYearPosition : currentYear) - 1
          : !!setYearPosition
            ? setYearPosition
            : currentYear;
      const lastMonthDates = new Date(getYear, lastMonth + 1, 0).getDate();
      let lastMonthDatesCount =
        new Date(getYear, lastMonth + 1, 0).getDate() - (firstDay - 1);
      if (firstDay != 0) {
        do {
          datesView.push(
            <View style={styles.daysContainer} key={lastMonthDatesCount}>
              <Typograph
                style={[styles.daysText, { color: themeColors.inActive }]}
              >
                {lastMonthDatesCount}
              </Typograph>
            </View>
          );
          lastMonthDatesCount++;
        } while (lastMonthDatesCount <= lastMonthDates);
      }
    } else {
      let lastMonthDatesCount = 1;
      if (firstDay != 0) {
        do {
          datesView.push(
            <View style={styles.daysContainer} key={lastMonthDatesCount} />
          );
          lastMonthDatesCount++;
        } while (lastMonthDatesCount <= firstDay);
      }
    }

    return datesView;
  };

  const selectedStartandEnd = (item: number) => {
    if (!isSelectedStart) {
      setStartDate(
        `${item}/${(setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1}/${!!setYearPosition ? setYearPosition : currentYear}`
      );
      if (getDatesRange) {
        dateRangeValue({
          start: `${item}/${(setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1}/${!!setYearPosition ? setYearPosition : currentYear}`,
          end: endDate,
        });
        setIsSelectedStart(true);
      } else {
        onPressDate(
          `${item}/${(setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1}/${!!setYearPosition ? setYearPosition : currentYear}`
        );
        setEndDate('');
      }
    } else {
      setEndDate(
        `${item}/${(setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1}/${!!setYearPosition ? setYearPosition : currentYear}`
      );
      dateRangeValue({
        start: startDate,
        end: `${item}/${(setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1}/${!!setYearPosition ? setYearPosition : currentYear}`,
      });
      setIsSelectedStart(false);
    }
  };

  const isDaysRange = (day: number) => {
    const dotStart =
      day === startData?.day &&
      (setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1 ===
        startData?.month &&
      (!!setYearPosition ? setYearPosition : currentYear) == startData?.year;
    const dotEnd =
      day === endData?.day &&
      (setMonthPosition >= 0 ? setMonthPosition : currentMonth) + 1 ===
        endData?.month &&
      (!!setYearPosition ? setYearPosition : currentYear) == endData?.year;

    if (dotStart && !!startDate && !!endDate) {
      dotInRange = !dotInRange;
    } else if (dotEnd && !!startDate && !!endDate) {
      dotInRange = !dotInRange;
    }

    return dotStart || dotEnd ? (
      <View style={styles.daysContainer}>
        <View style={{ position: 'absolute' }}>
          {!!customSelectedDot ? (
            customSelectedDot
          ) : (
            <View style={styles.selectedDot}></View>
          )}
        </View>
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
    ) : dotInRange ? (
      <View style={styles.daysContainer}>
        <View style={{ position: 'absolute' }}>
          {!!customRangeDot ? (
            customRangeDot
          ) : (
            <View style={styles.rangeDot}></View>
          )}
        </View>
        <Typograph
          style={[
            styles.daysText,
            {
              color: day == getSundays ? themeColors.red : themeColors.text,
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
              color: day == getSundays ? themeColors.red : themeColors.text,
            },
            customDateTextStyles,
          ]}
        >
          {day}
        </Typograph>
      </View>
    );
  };

  const datesLoop = () =>
    datesArray.map((item) => {
      if (item - 1 == getSundays) {
        getSundays = getSundays + 7;
      }
      return (
        <TouchableOpacity
          style={styles.daysContainer}
          key={item}
          onPress={() => {
            selectedStartandEnd(item);
          }}
        >
          {isDaysRange(item)}
        </TouchableOpacity>
      );
    });

  const nextMonthDatesLoop = () => {
    const datesView = [];

    if (customStyles.showLastNextDate) {
      const remainingDates = 7 - ((lastDate + firstDay) % 7);
      let datesCount = 1;

      if (remainingDates < 7) {
        do {
          datesView.push(
            <View style={styles.daysContainer} key={datesCount}>
              <Typograph
                style={[styles.daysText, { color: themeColors.inActive }]}
              >
                {datesCount}
              </Typograph>
            </View>
          );
          datesCount++;
        } while (datesCount <= remainingDates);
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
            <IconBack fill={themeColors.text} height={15} width={15} />
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
            <IconBack fill={themeColors.text} height={15} width={15} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.dateContainer}>
        <DynamicScrollView directionMode={{ direction: 'row' }}>
          {weekLoop()}
          {lastMonthDatesLoop()}
          {datesLoop()}
          {nextMonthDatesLoop()}
        </DynamicScrollView>
      </View>
    </View>
  );
};
