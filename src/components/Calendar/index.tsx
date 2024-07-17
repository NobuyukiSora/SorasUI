import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { DynamicScrollView } from '../DynamicScrollView';
import { Typograph } from '../Typograph';
import { PropsCalendar } from './props';
import moment from 'moment';

export const Calendar: React.FunctionComponent<PropsCalendar> = (props) => {
  const {
    width = 300,
    getDatesRange = false,
    dateRangeValue = () => {},
    onPressDate = () => {},
    customStyles = {
      daysType: 'short',
      daysHeight: 30,
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

  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

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

  const daysLoop = () => {
    let daysCount = 0;
    const daysView = [];
    do {
      daysView.push(
        <View style={styles.daysContainer} key={daysCount}>
          <Typograph
            style={[
              styles.daysText,
              { color: daysCount == 0 ? themeColors.red : themeColors.text },
            ]}
          >
            {customStyles.daysType === 'short'
              ? daysOfWeek.short[daysCount]
              : customStyles.daysType === 'supaShort'
                ? daysOfWeek.supaShort[daysCount]
                : daysOfWeek.long[daysCount]}
          </Typograph>
        </View>
      );
      daysCount++;
    } while (daysCount < daysOfWeek.long.length);
    return daysView;
  };

  const lastMonthDatesLoop = () => {
    const datesView = [];

    if (customStyles.showLastNextDate) {
      const lastMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
      const getYear = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;
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
    }

    return datesView;
  };

  const selectedStartandEnd = (item: number) => {
    if (!isSelectedStart) {
      setStartDate(`${item}/${currentMonth + 1}/${currentYear}`);
      if (getDatesRange) {
        dateRangeValue({
          start: `${item}/${currentMonth + 1}/${currentYear}`,
          end: endDate,
        });
        setIsSelectedStart(true);
      } else {
        onPressDate(`${item}/${currentMonth + 1}/${currentYear}`);
        setEndDate('');
      }
    } else {
      setEndDate(`${item}/${currentMonth + 1}/${currentYear}`);
      dateRangeValue({
        start: startDate,
        end: `${item}/${currentMonth + 1}/${currentYear}`,
      });
      setIsSelectedStart(false);
    }
  };

  const isDaysRange = (day: number) => {
    const dotStart =
      day === startData?.day &&
      currentMonth + 1 === startData?.month &&
      currentYear == startData?.year;
    const dotEnd =
      day === endData?.day &&
      currentMonth + 1 === endData?.month &&
      currentYear == endData?.year;

    if (dotStart && !!startDate && !!endDate) {
      dotInRange = !dotInRange;
    } else if (dotEnd && !!startDate && !!endDate) {
      dotInRange = !dotInRange;
    }

    return dotStart || dotEnd ? (
      <View style={[styles.selectedDot]}>
        <Typograph
          style={[
            styles.daysText,
            {
              color: themeColors.white,
            },
          ]}
        >
          {day}
        </Typograph>
      </View>
    ) : dotInRange ? (
      <View style={styles.daysContainer}>
        <View style={styles.rangeDot}></View>
        <Typograph
          style={[
            styles.daysText,
            {
              color: day == getSundays ? themeColors.red : themeColors.text,
            },
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
      height: customStyles.daysHeight,
      width: width / 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateContainer: {
      width: width,
    },
    calendarContainer: {
      alignItems: 'center',
      padding: Metrics[4],
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: Metrics[4],
      alignItems: 'center',
      paddingHorizontal: Metrics[4],
    },
    titleText: {
      textAlign: 'center',
      fontSize: Metrics[16],
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
      position: 'absolute',
    },
  });

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth - 1)}>
          <Typograph>{'<'}</Typograph>
        </TouchableOpacity>
        <View>
          <Typograph style={[styles.titleText, { fontWeight: '800' }]}>
            {months[currentMonth]}
          </Typograph>
          <Typograph style={[styles.titleText, { fontSize: Metrics[12] }]}>
            {currentYear}
          </Typograph>
        </View>
        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth + 1)}>
          <Typograph>{'>'}</Typograph>
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        <DynamicScrollView directionMode={{ direction: 'row' }}>
          {daysLoop()}
          {lastMonthDatesLoop()}
          {datesLoop()}
          {nextMonthDatesLoop()}
        </DynamicScrollView>
      </View>
    </View>
  );
};
