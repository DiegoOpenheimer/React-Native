import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'


const ContainerSegment = ({ values, onPress }) => {

    const [ selectedIndex, setValue  ] = useState(0)

    return (
        <View style={styles.container}>
            <SegmentedControlTab
                values={ values }
                onTabPress={ index => {
                    setValue(index)
                    onPress(index)
                } }
                selectedIndex={ selectedIndex }           
             />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ContainerSegment