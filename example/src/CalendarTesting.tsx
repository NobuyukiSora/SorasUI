import * as React from 'react';
import { View } from 'react-native';
// import { multiply } from 'sora-ui';
import {
  Button,
  Calendar,
  Typograph,
} from '../../src/components/navigatorComponents';
import { themeColors } from '../../src/theme/themeManagement';

export const CalendarTesting = () => {
  const [calendarType, setCalendarType] = React.useState(false);
  const [showLastNextDates, setShowLastNextDates] = React.useState(false);
  const [calendarDateRange, setCalendarDateRange] = React.useState({
    start: '',
    end: '',
  });
  const [calendarDate, setCalendarDate] = React.useState('');
  const [monthPosition, setMonthPosition] = React.useState(0);
  const [yearPosition, setYearPosition] = React.useState(2024);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  React.useEffect(() => {
    if (monthPosition > 11) {
      setYearPosition(yearPosition + 1);
      setMonthPosition(0);
    } else if (monthPosition < 0) {
      setYearPosition(yearPosition - 1);
      setMonthPosition(11);
    }
  }, [monthPosition, yearPosition]);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Typograph>{'getRange: '}</Typograph>
        <Button
          onPress={() => setCalendarType(!calendarType)}
          title={`${calendarType}`}
          customStyleButton={{ height: 10 }}
          customStyleTitle={{ fontSize: 10 }}
        ></Button>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Typograph>{'showLastNextDate: '}</Typograph>
        <Button
          onPress={() => setShowLastNextDates(!showLastNextDates)}
          title={`${showLastNextDates}`}
          customStyleButton={{ height: 10 }}
          customStyleTitle={{ fontSize: 10 }}
        ></Button>
      </View>
      {!calendarType ? (
        <Typograph>{`getDate: ${calendarDate}`}</Typograph>
      ) : (
        <View>
          <Typograph>{`getRangeStart: ${calendarDateRange.start}`}</Typograph>
          <Typograph>{`getRangeEnd: ${calendarDateRange.end}`}</Typograph>
        </View>
      )}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typograph>{'Customize Calendar'}</Typograph>
        <Calendar
          width={300}
          height={300}
          customStyles={{
            weekType: 'short',
            showLastNextDate: showLastNextDates,
          }}
          dateRangeValue={(date) => setCalendarDateRange(date)}
          onPressDate={(date) => setCalendarDate(date)}
          getDatesRange={calendarType}
          customWeekTextStyles={{ fontWeight: '700' }}
          customDateTextStyles={{ fontSize: 30 }}
          setYearPosition={yearPosition}
          setMonthPosition={monthPosition}
          customRangeDot={
            <View
              style={{
                width: 3,
                height: 30,
                backgroundColor: themeColors.red,
                transform: [{ rotate: '45deg' }],
              }}
            />
          }
          customSelectedDot={
            <View>
              <View
                style={{
                  width: 3,
                  height: 30,
                  backgroundColor: themeColors.active,
                  transform: [{ rotate: '45deg' }],
                }}
              />
              <View
                style={{
                  width: 3,
                  height: 30,
                  backgroundColor: themeColors.active,
                  position: 'absolute',
                  transform: [{ rotate: '-45deg' }],
                }}
              />
            </View>
          }
          customizeSelectedTextStyles={{ color: themeColors.red }}
          customTitleHeader={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typograph
                customStyle={{ textAlign: 'center' }}
              >{`${months[monthPosition]}\n${yearPosition}`}</Typograph>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  onPress={() => setMonthPosition(monthPosition - 1)}
                  title={`-`}
                  customStyleButton={{ height: 10 }}
                  customStyleTitle={{ fontSize: 10 }}
                ></Button>
                <Button
                  onPress={() => setMonthPosition(monthPosition + 1)}
                  title={`+`}
                  customStyleButton={{ height: 10 }}
                  customStyleTitle={{ fontSize: 10 }}
                ></Button>
              </View>
            </View>
          }
        ></Calendar>
        <Typograph>{'Default'}</Typograph>
        <Calendar
          width={300}
          height={200}
          customStyles={{
            weekType: 'short',
            showLastNextDate: showLastNextDates,
          }}
          dateRangeValue={(date) => setCalendarDateRange(date)}
          onPressDate={(date) => setCalendarDate(date)}
          getDatesRange={calendarType}
        ></Calendar>
      </View>
    </View>
  );
};
