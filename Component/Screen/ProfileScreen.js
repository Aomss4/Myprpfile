import React, { useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity,
  StyleSheet, ScrollView, Platform, PermissionsAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen() {
  
  const [imageUri, setImageUri] = useState('https://via.placeholder.com/100'); // 👈 สร้าง state
  const [name, setName] = useState('Samson');
  const [isEditingName, setIsEditingName] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+66 85 451 7893');
  const [isEditingPhone, setIsEditingPhone] = useState(false);  
  
  
  
  
  // 👇 ฟังก์ชันเลือกรูป
  const handleChoosePhoto = async () => {
    // Android: ขอ permission
    if (Platform.OS === 'android') {
      const permission = Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  
      const granted = await PermissionsAndroid.request(permission, {
        title: 'Permission to access photos',
        message: 'We need your permission to access your photos.',
        buttonPositive: 'OK',
      });
  
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Permission not granted');
        return;
      }
    }
  
    // เปิดแกลเลอรี (iOS ไม่ต้องขอ permission เอง ถ้ามีใน Info.plist แล้ว)
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}> 
          <Icon name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView style={styles.contentScroll}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
          <Image
          source={{ uri: imageUri }} // ✅ ใช้ค่าที่เปลี่ยนจริง
          style={styles.avatar}
          />
            <TouchableOpacity style={styles.cameraIcon}  onPress={handleChoosePhoto}>
          <Icon name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.nameContainer}>
  {isEditingName ? (
    <TextInput
      style={styles.nameInput}
      value={name}
      onChangeText={setName}
      onSubmitEditing={() => setIsEditingName(false)}
      onBlur={() => setIsEditingName(false)}
      autoFocus
    />
  ) : (
    <>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={() => setIsEditingName(true)}>
        <Icon name="pencil" size={16} color="#444" />
      </TouchableOpacity>
    </>
  )}
</View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value="example123@example.com"
              editable={false}
            />

            <Text style={styles.inputLabel}>Date of birth</Text>
            <TextInput
              style={styles.input}
              value="14 / 02 / 1997"
              editable={false}
            />

<Text style={styles.inputLabel}>Phone number</Text>
<View style={styles.editableRow}>
  {isEditingPhone ? (
    <TextInput
      style={[styles.input, { flex: 1 }]}
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      onBlur={() => setIsEditingPhone(false)}
      autoFocus
      keyboardType="phone-pad"
    />
  ) : (
    <>
      <Text style={[styles.input, { flex: 1, color: '#000' }]}>{phoneNumber}</Text>
      <TouchableOpacity onPress={() => setIsEditingPhone(true)}>
        <Icon name="pencil" size={18} color="#444" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </>
  )}
</View>

            <Text style={styles.inputLabel}>Congenital diseases</Text>
            <View style={styles.dropdown}>
              <Picker
                selectedValue="diabetes"
                enabled={false}
                style={styles.picker}
              >
                <Picker.Item label="diabetes" value="diabetes" />
              </Picker>
              <Icon name="chevron-down" size={20} color="#888" style={styles.dropdownIcon} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Tab Bar */}
      
        
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA726',
  },
  contentScroll: {
    flex: 1,
    backgroundColor: '#FFA726',
  },
  header: {
    backgroundColor: '#FFA726',
    height: 90,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: 15,
    bottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
    flex: 1,
    minHeight: '100%',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFA726',
    borderRadius: 12,
    padding: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  inputGroup: {
    width: '100%',
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: '#444',
  },
  input: {
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    height: 50,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: 'white',
    marginTop: 3,
  },
  nameInput: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 2,
    minWidth: 100,
  },
});