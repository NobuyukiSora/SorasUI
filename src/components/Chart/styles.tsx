import { StyleSheet } from 'react-native';

export const createStyles = (
  Metrics: any,
  themeColors: any,
  CARD_PADDING: any,
  POINT_SIZE: any,
  LABEL_HEIGHT: any
) => {
  return StyleSheet.create({
    card: {
      backgroundColor: themeColors.backgroundSecondary,
      borderRadius: Metrics[16],
      padding: CARD_PADDING,
      margin: Metrics[16],
      elevation: 4,
    },
    fullScreenCard: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: themeColors.background,
      zIndex: 100,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Metrics[16],
    },
    fullScreenHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Metrics[24],
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Metrics[12],
    },
    currentTotal: { fontSize: Metrics[20], fontWeight: 'bold' },
    lastPeriod: { fontSize: Metrics[12], color: themeColors.text },
    dateRange: { fontSize: Metrics[12], color: themeColors.text },
    // Add/Update these in your styles.ts
    selectorContainer: {
      flexDirection: 'row',
      backgroundColor: themeColors.background, // Subtle contrast
      borderRadius: Metrics[8],
      padding: Metrics[2],
    },
    selectorButton: {
      paddingHorizontal: Metrics[12],
      paddingVertical: Metrics[8],
      borderRadius: Metrics[8],
      minWidth: Metrics[40],
      alignItems: 'center',
    },
    selectorButtonActive: {
      backgroundColor: themeColors.active, // The primary highlight color
    },
    selectorText: {
      fontSize: 12,
      fontWeight: '600',
    },

    chartArea: { position: 'relative' },
    chartBarsRowContainer: {
      position: 'absolute',
      flexDirection: 'row',
      zIndex: 1,
    },
    chartPoint: {
      position: 'absolute',
      width: POINT_SIZE,
      height: POINT_SIZE,
      borderRadius: POINT_SIZE / 2,
      backgroundColor: themeColors.background,
      borderWidth: 2,
      borderColor: themeColors.active,
    },
    chartLabelsRow: { position: 'absolute', height: LABEL_HEIGHT, bottom: 0 },
    chartLabelText: {
      fontSize: Metrics[12],
      color: themeColors.text,
      opacity: 0.6,
    },
    valueLabel: {
      position: 'absolute',
      fontSize: Metrics[8],
      fontWeight: 'bold',
      color: themeColors.active,
      textAlign: 'center',
      width: 80,
    },
  });
};
