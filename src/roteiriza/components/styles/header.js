import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const HeaderTop = ({headerTitle}) =>{
    return(
        <View style={styles.headerTop}>
            <AntDesign 
                name="left" 
                size={24} 
                color="#063A7A" 
            />
            <Text style={styles.titleHeader}>{headerTitle}</Text>
        </View>
    )
}

export default HeaderTop;

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        marginLeft: 25,
        marginBottom: 5
        

    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#063A7A',
        paddingLeft: 4
    }
})