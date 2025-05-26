import { StyleSheet } from 'react-native';
import { COMMON_COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_COLORS.BLUE_LIGHT,
    padding: 20,
  },
  greeting: {
    marginBottom: 8,
  },
  taskList: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  taskTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  editButton: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: COMMON_COLORS.TEXT_PRIMARY,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
