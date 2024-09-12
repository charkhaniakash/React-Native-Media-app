import {Text, View } from 'react-native'
import React from 'react'

const InfoBox = ({title , subtitle,containerStyle,textStyles}) => {
  return (
    <View className={`${containerStyle} `}>
      <Text className={`text-gray-100 text-center ${textStyles}`} >{title}</Text>
      <Text className={`text-gray-100 text-center font-pregular ${textStyles}`}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox
