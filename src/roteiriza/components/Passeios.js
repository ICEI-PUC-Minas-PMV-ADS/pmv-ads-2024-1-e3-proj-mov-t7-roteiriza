import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import  HeaderTop  from './styles/header'
import ContainerPasseios from './styles/containerPasseios'
import Button from './styles/buttonAdicionar';

const Passeios = () => {
    return(
           
        <ScrollView >
            <View  style={styles.fixedElement}>
                <HeaderTop headerTitle={"Passeios"}  />
            </View>

            <View>               
                <View style={styles.container}>
                    <ContainerPasseios />
                    
                    <View style={styles.buttonBox}>
                        <Button 
                            textButton={"ADICIONAR"} 
                            color='#F5BD60' 
                            fontColor='#FFFFFF'
                        />

                        <Button 
                            textButton={"CANCELAR"} 
                            color='#FFFFFF' 
                            fontColor='#181818' 
                            borderColor={'black'} 
                            borderWidth={2}
                        />
                    </View>
                </View>
            </View>
     </ScrollView>

    );

}

export default Passeios;

const styles = StyleSheet.create({
    fixedElement: {
        zIndex: 5
    },
    buttonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        bottom: 20
    }    
})