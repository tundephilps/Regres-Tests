import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { styles } from "../components/Users";
import useUserDetails from "../hooks/UserDetails";
import * as Linking from 'expo-linking';
import Navbar from '../components/Navbar';
import EditUser from "../components/EditUser";

const UserDetails = ({ route }) => {
    const { item } = route.params;
    const { avatar, email, first_name, last_name, id } = item;
    const { userDetails, isLoading } = useUserDetails(id);
    const [ visible, setVisible ] = React.useState(false);

    const openURL = url => Linking.openURL(url);

    return (
        <View style={styles.container}>
            <Navbar/>
            <EditUser visible={visible} setVisible={setVisible} data={item}/>
            <View style={styles.wrapper}>
                <View style={styles.imageWrapper}>
                    <Image source={avatar} style={styles.image}/>
                </View>
                <View>
                    <Text style={styles.email}>{email}</Text>
                    <Text style={styles.name}>{first_name} {last_name}</Text>
                    {isLoading ? (
                        <ActivityIndicator/>
                    ) : (
                        <View>
                            <Text style={styles.bio}>{userDetails.support?.text}</Text>
                            <TouchableOpacity onPress={() => openURL(userDetails.support?.url)}>
                                <Text style={styles.url}>{userDetails.support?.url}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            
        </View>
    )
    
}

export default UserDetails;