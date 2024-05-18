import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable, ActivityIndicator, TextInput } from "react-native";
import Globals from "../global/Globals";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actions";

const EditUser = (params) => {
    const { visible, setVisible, data } = params;
    const dispatch = useDispatch();
    const [ inputs, setInputs ] = React.useState({
        name : data.first_name,
        job : "Great Sales"
    })
    const [ isLoading, setIsLoading ] = React.useState(false)

    const handleUpdate = async () => {
        setIsLoading(true)
        const response = await Globals.APIRequest({
            url : `${Globals.BaseUrl}/api/update/${data.id}`,
            method : "PUT",
            data : inputs
        })
        setIsLoading(false)

        if(response.updatedAt){
            dispatch(updateUser({
                id : data.id,
                field : "first_name",
                value : inputs.name
            }))
            setVisible(false)
        }
        else{
            Globals.SendResponse({
                status : "error",
                message : response.error || response.message
            })
        }
    }

    const handleChangeText = (value, type) => setInputs(prev => ({
        ...prev,
        [type] : value
    }))



    return(
        <Modal 
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <Pressable style={styles.selectContainer} onPress={() => setVisible(false)}>
                <View style={styles.selectWrapper}>
                    <Text style={styles.title}>Edit User</Text>

                    <View style={styles.inputbox}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={val => handleChangeText(val, "name")}
                            value={inputs.name}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>{isLoading ? <ActivityIndicator color="#fff"/> : "Update" }</Text>
                    </TouchableOpacity>

                </View>
            </Pressable>
        </Modal>
    )
}

export default EditUser;

const styles = StyleSheet.create({
    selectContainer : {
        position : "relative",
        backgroundColor:"rgba(0, 0, 0, .7)",
        flex : 1,
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },

    selectWrapper : {
        width : "90%",
        borderRadius : 20,
        backgroundColor : "#fff",
        padding : 20,
    },
    title : {
        fontSize : 14,
        fontFamily : "Poppins_700Bold",
        color : "#0fa969",
        textAlign : "center",
        marginBottom : 15
    },
    inputbox:{
        paddingVertical:8,
        paddingHorizontal:10,
        backgroundColor:"transparent",
        borderBottomWidth:1.2,
        marginBottom:5,
        borderColor:"rgba(26, 17, 16,0.1)",
    },

    input:{
        width: "100%",
        color: "#454851",
        fontSize: 13,
        opacity:0.8,
        fontFamily: "Poppins_400Regular"
    },
    label : {
        fontFamily: "Poppins_500Medium",
        fontSize : 12
    },
    button : {
        backgroundColor : "#A10F7E",
        padding : 8,
        borderRadius : 5,
        width: "100%",
        marginTop : 5
    },
    buttonText : {
        color : "#fff",
        fontFamily : "Poppins_500Medium",
        textAlign : "center",
        fontSize : 11
    }
})