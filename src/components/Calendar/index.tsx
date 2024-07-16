import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { DynamicScrollView } from '../DynamicScrollView';
import { Typograph } from '../Typograph';
import { PropsCalendar } from './props';

export const Calendar: React.FunctionComponent<PropsCalendar> = (props) => {
  const {
    width = 300,
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

  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

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

  const daysLoop = () => {
    let daysCount = 0;
    const daysView = [];
    do {
      daysView.push(
        <View style={styles.daysContainer} key={daysCount}>
          <Typograph style={styles.daysText}>
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

  const datesLoop = () => {
    let datesCount = customStyles.showLastNextDate ? 1 : 1 - firstDay;
    let getSundays = firstDay == 0 ? firstDay + 1 : 7 - firstDay + 1;
    const datesView = [];
    do {
      datesView.push(
        <View style={styles.daysContainer} key={datesCount}>
          <Typograph
            style={[
              styles.daysText,
              {
                color:
                  datesCount == getSundays ? themeColors.red : themeColors.text,
              },
            ]}
          >
            {datesCount >= 1 ? datesCount : null}
          </Typograph>
        </View>
      );
      if (datesCount == getSundays) {
        getSundays = getSundays + 7;
      }
      datesCount++;
    } while (datesCount <= lastDate);

    return datesView;
  };

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
  });

  return (
    <View style={styles.calendarContainer}>
      {/* <Typograph>{`${currentMonth}\n${currentYear}\n${lastDate}\n${firstDay}\n${startDayName}\n${7 - ((lastDate + firstDay) % 7)}`}</Typograph> */}
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
