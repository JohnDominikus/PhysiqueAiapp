// app/CustomDropdown.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

interface CustomDropdownProps {
  isVisible: boolean;
  data: string[];
  onSelect: (item: string) => void;
  onClose: () => void;
  selectedValue: string;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  isVisible,
  data,
  onSelect,
  onClose,
  selectedValue,
  placeholder,
}) => {
  if (!isVisible) return null; // If not visible, don't render anything

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.placeholderText}>{placeholder}</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.itemContainer} 
                onPress={() => onSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for emphasis
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 10, // Increase elevation for a more pronounced shadow
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 8, // Shadow radius
  },
  placeholderText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold', // Bold placeholder for emphasis
    textAlign: 'center', // Center the placeholder text
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10, // Rounded corners for items
    backgroundColor: '#F7F7F7', // Light background for items
    marginBottom: 10, // Spacing between items
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light border for separation
  },
  itemText: {
    fontSize: 16,
    color: '#333', // Dark text color for readability
    textAlign: 'center', // Center the item text
  },
  closeText: {
    marginTop: 20,
    color: '#FFB200', // Bright color for the close button
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomDropdown;
