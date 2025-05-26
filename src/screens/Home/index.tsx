import React, { JSX } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COMMON_COLORS, TEXT_VARIANTS } from '../../constants';
import styles from './style';

const tasks = [
  {
    id: '1',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, and fruits',
    dueDate: 'Today 5:00 PM',
  },
  {
    id: '2',
    title: 'Client Meeting',
    description: 'Discuss Q2 roadmap and deliverables',
    dueDate: 'Tomorrow 11:00 AM',
  },
  {
    id: '3',
    title: 'Workout',
    description: 'Evening gym session',
    dueDate: 'Today 7:00 PM',
  },
];

const Home = (): JSX.Element => {
  const renderTask = ({ item }: { item: typeof tasks[0] }) => (
    <View style={styles.taskCard}>
      <View style={{ flex: 1 }}>
        <Text style={[TEXT_VARIANTS.body, styles.taskTitle]}>{item.title}</Text>
        <Text style={[TEXT_VARIANTS.small, { color: '#555' }]} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={[TEXT_VARIANTS.subtitle, { color: '#888', marginTop: 4 }]}>
          Due: {item.dueDate}
        </Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        {/* <Ionicons name="create-outline" size={20} color={COMMON_COLORS.TEXT_PRIMARY} /> */}
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[TEXT_VARIANTS.heading2, styles.greeting]}>Welcome 👋</Text>
      <Text style={TEXT_VARIANTS.body}>Here are your tasks for today:</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab}>
      <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
