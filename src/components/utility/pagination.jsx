import { Flex, Select, Text } from '@chakra-ui/react';
import React, { Component } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Dropdown, IconButton } from 'rsuite';




class Pagination extends Component {
    state = { 
        data: undefined
     } 

    componentDidMount = ()=>{
        this.setState({data:undefined}, ()=>{
            var tempData = []
            var index = 0
            while(index < this.props.of) {
                var tempValue = {}
                tempValue['value'] = index+1
                tempValue['label'] = index+1
                index +=1
                tempData.push(tempValue)
            }
            console.log(tempData)
            this.setState({data:tempData}, ()=>{
                console.log(this.state.data)
        })
        })
        
    }
    render() { 
        return (<>
        <Flex direction={'row'} gap={2}>
            <Flex flex={1}>
                <IconButton icon={<FaArrowLeft />} onClick={this.props.previousPage}></IconButton>
            </Flex>
            <Text flex={1} alignItems={'center'} p={3}>Page </Text>
            <Select flex={1} minW={100} id='pageNumber' mt={2} onChange={()=>{
                this.props.onChange(document.getElementById('pageNumber').value)
            }} value={this.props.activePage}>
                {
                    this.state.data!==undefined?this.state.data.map((item)=>{
                        return(<option value={item.value}>{item.label}</option>)
                    }):<>
                        <option value={1}>{1}</option>
                    
                    </>
                }

            </Select>
            <Text flex={1} p={3}>of</Text>
            <Text mt={3}>{this.props.of}</Text>
            <Flex flex={1}>
                <IconButton icon={<FaArrowRight />} onClick={this.props.nextPage}></IconButton>

            </Flex>

        </Flex>
        
        
        
        </>);
    }
}
 
export default Pagination;