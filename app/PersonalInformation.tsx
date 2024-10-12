// app/PersonalInformationWithProgress.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import CustomDropdown from './CustomDropdown'; // Ensure this path is correct

const PersonalInformationWithProgress: React.FC = () => {
  const router = useRouter();

  // State declarations
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [bodyGoal, setBodyGoal] = useState<string>('');
  const [userLevel, setUserLevel] = useState<string>('Beginner');
  const [healthIssue, setHealthIssue] = useState<string>('no');
  const [healthComment, setHealthComment] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dropdownData, setDropdownData] = useState<string[]>([]);
  const [dropdownType, setDropdownType] = useState<string>('');

  // Dropdown options
  const bodyTypes = ['Ectomorph', 'Mesomorph', 'Endomorph'];
  const bodyGoals = ['Lose Weight', 'Gain Muscle', 'Maintain Weight'];
  const userLevels = ['Beginner', 'Intermediate', 'Advanced'];

  // Progress Calculation
  const getProgressStep = (): number => {
    let steps = 0;
    if (height) steps++;
    if (weight) steps++;
    if (age) steps++;
    if (bodyType) steps++;
    if (bodyGoal) steps++;
    if (userLevel) steps++;
    if (healthIssue === 'yes' && healthComment) steps++;
    return steps;
  };

  // Handle selection from dropdown
  const handleDropdownSelect = (item: string): void => {
    switch (dropdownType) {
      case 'bodyType':
        setBodyType(item);
        break;
      case 'bodyGoal':
        setBodyGoal(item);
        break;
      case 'userLevel':
        setUserLevel(item);
        break;
      default:
        break;
    }
    setModalVisible(false); // Close dropdown after selection
  };

  // Open dropdown
  const openDropdown = (type: string, data: string[]): void => {
    setDropdownData(data);
    setDropdownType(type);
    setModalVisible(true);
  };

  // Function to render input fields
  const renderInput = (iconName: string, placeholder: string, value: string, setValue: (val: string) => void) => (
    <View style={styles.inputContainer}>
      <MaterialIcons name={iconName} size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />
    </View>
  );

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome to Physique AI</Text>
        <Text style={styles.subtitle}>Personal Information</Text>

        {/* Render input fields */}
        {renderInput("height", "Height (cm)", height, setHeight)}
        {renderInput("fitness-center", "Weight (kg)", weight, setWeight)}
        {renderInput("schedule", "Age", age, setAge)}

        {/* Body Type Dropdown */}
        <TouchableOpacity onPress={() => openDropdown('bodyType', bodyTypes)} style={styles.dropdown}>
          <Text style={styles.dropdownText}>{bodyType || "Select Body Type"}</Text>
        </TouchableOpacity>

        {/* Body Goal Dropdown */}
        <TouchableOpacity onPress={() => openDropdown('bodyGoal', bodyGoals)} style={styles.dropdown}>
          <Text style={styles.dropdownText}>{bodyGoal || "Select Body Goal"}</Text>
        </TouchableOpacity>

        {/* User Level Dropdown */}
        <TouchableOpacity onPress={() => openDropdown('userLevel', userLevels)} style={styles.dropdown}>
          <Text style={styles.dropdownText}>{userLevel}</Text>
        </TouchableOpacity>

        {/* Custom Dropdown Component */}
        <CustomDropdown
          isVisible={modalVisible}
          data={dropdownData}
          onSelect={handleDropdownSelect}
          onClose={() => setModalVisible(false)}
          selectedValue={
            dropdownType === 'bodyType' ? bodyType :
            dropdownType === 'bodyGoal' ? bodyGoal :
            userLevel
          }
          placeholder={`Select ${dropdownType.charAt(0).toUpperCase() + dropdownType.slice(1)}`}
        />

        {/* Health Issues */}
        <Text style={styles.healthQuestion}>Do you have any health issues?</Text>
        <View style={styles.healthContainer}>
          <TouchableOpacity onPress={() => setHealthIssue('yes')}>
            <Text style={healthIssue === 'yes' ? styles.selectedOption : styles.option}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHealthIssue('no')}>
            <Text style={healthIssue === 'no' ? styles.selectedOption : styles.option}>No</Text>
          </TouchableOpacity>
        </View>

        {/* Health Comment Input */}
        {healthIssue === 'yes' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Health Issues (if any)"
              value={healthComment}
              onChangeText={setHealthComment}
            />
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={() => {/* Handle submission logic */}}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Icons for Progress Representation */}
        <View style={styles.iconContainer}>
          {Array.from({ length: 7 }, (_, index) => (
            <MaterialIcons
              key={index}
              name={index < getProgressStep() ? "check-circle" : "radio-button-unchecked"}
              size={30}
              color={index < getProgressStep() ? "#FFB200" : "#ccc"}
            />
          ))}
        </View>

        {/* Indicate the Last Part of Step 2 */}
        <Text style={styles.stepIndicator}>This is the last part of Step 2</Text>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
    color: '#FFB200',
  },
  dropdown: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: '#222227',
  },
  healthQuestion: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  healthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  option: {
    fontSize: 16,
    color: '#222227',
  },
  selectedOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFB200',
  },
  submitButton: {
    backgroundColor: '#FFB200',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  stepIndicator: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
});

export default PersonalInformationWithProgress;
