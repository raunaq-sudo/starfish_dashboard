import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  //Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  Tag,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { Component, useEffect, useState } from 'react';
import { FaCross, FaFileUpload, FaPlus, FaUnlink, } from 'react-icons/fa';
import { IoMdRefresh, IoMdRefreshCircle } from 'react-icons/io';
import { IconButton, Stack,Button, Uploader, DateRangePicker, SelectPicker } from 'rsuite';
import inuit from '../../config/inuitConfig';
import apiEndpoint from '../../config/data';
import { compareAsc, isThisSecond } from 'date-fns';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import qbBotton from '../../../media/images/quickbookButton.png'
import { useHotglue } from '@hotglue/widget';
import { array } from 'i/lib/util';



//function WrappedComponent (WrapComponent){
//  //const [connected, setConnected] = useState(false)
//  const sendData = async () =>{
//
//    var data = new FormData()
//    data.append('app_name',document.getElementById('appName').value)
//    data.append('integration_type','hotglue')
//    data.append('capture_location',false?'true':'false')
//    data.append('location_attr',false?'true':'false')
//    //console.log(data)
//    await fetch(apiEndpoint + '/api/add_integration/',{
//      headers: { "Authorization": "Bearer " + localStorage['access'] },
//      method:'POST',
//      body:data
//    }).then(response=>response.json())
//    .then(data=>{
//    }).catch((err)=>alert("Error Occured!."))
//    
//  }
//  return( 
//    function Wc (props){
//      const [fetchDataFlag, setFetchDataFlag] = useState(false)
//      
//      const {openWidget} = useHotglue();
//        return(
//          <WrapComponent tenant={
//            (val)=>{
//              openWidget(val, options)
//          }} connectedStatus = {"Test"} fetchDataFlag = {fetchDataFlag} {...props}/>     
//      )
//
//        
//      }
//  )
//}



export default function IntegrationSettingHook(props) {

    const [connectModal, setConnectModal]=useState( false)
    const [captureLocation, setCaptureLocation]=useState( false)
    const [quickbooksType, setQuickbooksType]=useState(false)
    const [syncButtonLoading, setSyncButtonLoading]=useState(false)
    const [saveBtnLoading, setSaveBtnLoading]=useState(false)
    const [locationAttr, setLocationAttr]=useState(false)
    const [integration_type, setIntegration_type]=useState()
    const [uploadBtnLoading, setUploadBtnLoading]=useState(false)
    const [excelUploadData, setExcelUploadData]=useState({from_date:'', to_date:'', value:''})
    const [limitUploader, setLimitUploader] = useState([])
    const [modalButtonLoading, setModalButtonLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [int_id, setInt_id] = useState()
    const [integrationConnector, setIntegrationConnector] = useState([])
    const [companyId, setCompanyId] = useState()
    const [newIntegration, setNewIntegration] = useState()
    const [hotglueFlowId, setHotglueFlowId] = useState()
    const [sourceId, setSourceId] = useState()
    const [integrationTypes, setIntegrationTypes] = useState([])
    const [allIntegrationTypes, setAllIntegrationTypes] = useState([])
    const [tpc, setTpc] = useState()
    const [captureLocationDisplay,setCaptureLocationDisplay] = useState(false)
    const [locationAttrDisplay, setLocationAttrDisplay] = useState(false)
    const [tenant, setTenant] = useState()
    const [latestIntegration, setLatestIntegration] = useState()
    const [hotglueNewLink, setHotglueNewLink] = useState()
    const [attributeType, setAttributeType] = useState(false)
    const [apps, setApps] = useState([
        {
        id:"",
        app_name: 'Quickbook',
        company_id: '123456789',
        integration_type: 'Online',
        last_sync: '2023-12-23',
        daily_sync: 'On',
        connected:true
      }])
    const [metadata, setMetadata] = useState()
  
  const {link, createJob} = useHotglue()
  
  const connectAuth = async (id) =>{
    var data = new FormData()
    //console.log("Updating connection for " + id)
    data.append('integration_id', id)

    localStorage.setItem('integration_id', id)

    await fetch(apiEndpoint + '/api/connect_auth/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'POST',
      body: data,

    }).then(response => response.json())
      .then(data => {
        //console.log(data)
        fetchIntegrations()

      }).catch(err => {
        //console.error(err)
        alert('Error occured.')
      })
  }

  const disconnectAuth = async (id) =>{
    var data = new FormData()
    data.append('integration_id', id)

    localStorage.setItem('integration_id', id)

    await fetch(apiEndpoint + '/api/disconnect_auth/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'POST',
      body: data,

    }).then(response => response.json())
      .then(data => {
        //console.log(data)
        fetchIntegrations()

      }).catch(err => {
        //console.error(err)
        alert('Error occured.')
      })
  }



  const handleAuth = async (id) => {
    setSyncButtonLoading(true)
    if (tpc){
      options['tenantMetadata'] = metadata
      console.log(options)
      link(companyId && "_" && newIntegration, hotglueFlowId, sourceId, false, options)
    }else{
      var data = new FormData()
    data.append('client_id', '')
    data.append('secret_key', '')
    data.append('inuit_company_id', '')
    data.append('type','')
    data.append('integration_id', id)

    localStorage.setItem('integration_id', id)

    await fetch(apiEndpoint + '/api/inuit_auth/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'POST',
      body: data,

    }).then(response => response.json())
      .then(data => {
        //console.log(data)
        redirect(data)

      }).catch(err => {
        //console.error(err)
        alert('Error occured.')
      })
      
      setSyncButtonLoading(false)



    }
    
  }
  
  const redirect = (url) => {
    setModalButtonLoading(false) 
    setModalOpen(false)
    window.open(url)
  }

  const fetchIntegrations = async () =>{
    setApps([])
    await fetch(apiEndpoint + '/api/auth_update/', {
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method: 'GET',

    }).then(response => response.json())
      .then(data => {
        console.log('fetchIntegration')
        console.log(data)
        setApps(data['integration'])
        
        setAllIntegrationTypes(data['integration_types'])
        var itype = []
        data['integration_types'].map((item)=>itype.push({value:item['integration_type'],label:item['integration_desc']}))
        setMetadata(data['metadata'])
        console.log("Metadata")
        console.log(metadata)
        setIntegrationTypes(itype)
      }).catch(err => {
        //console.error(err)
        alert('Error occured.')
      })
  }



  const sendData = async () =>{
    setSaveBtnLoading(true)
    var data = new FormData()
    data.append('app_name',document.getElementById('appName').value)
    data.append('integration_type',integration_type)
    data.append('capture_location',captureLocation?'true':'false')
    data.append('location_attr',locationAttr?'true':'false')
    //console.log(data)
    await fetch(apiEndpoint + '/api/add_integration/',{
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method:'POST',
      body:data
    }).then(response=>response.json())
    .then(data=>{
      fetchIntegrations()
    }).catch((err)=>alert("Error Occured!."))
    if (!tpc){
      setConnectModal(!connectModal)

    }
   
  }

  const sendDataTPC = async () =>{
    setCompanyId(undefined)
    setInt_id(undefined)
    setSaveBtnLoading(true)
    var data = new FormData()
    data.append('app_name',document.getElementById('appName').value)
    data.append('integration_type',integration_type)
    data.append('capture_location',captureLocation?'true':'false')
    data.append('location_attr',locationAttr?'true':'false')
    //console.log(data)
    await fetch(apiEndpoint + '/api/add_integration/',{
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method:'POST',
      body:data
    }).then(response=>response.json())
    .then(data=>{
      setCompanyId(data['company_id'])
      setInt_id(data['last_integration_id'])
      setHotglueNewLink(true)
      console.log(data)
      fetchIntegrations()
    }).catch((err)=>alert("Error Occured!."))
    //setSaveBtnLoading(false)
    //setConnectModal(!connectModal)
    
   
  }

  useEffect(()=>{
    console.log(companyId + "_" + int_id)
    if(hotglueNewLink && companyId!==undefined && int_id!==undefined){
      options['tenantMetadata'] = metadata
      console.log(options)
      link(companyId+ "_" + int_id, hotglueFlowId, sourceId, false, options)
      setHotglueNewLink(false)
    }
    //setHotglueNewLink(false)
  }, [hotglueNewLink])
  const handleUpload = async (id) =>{
    
  }


  const setFormDataDate = (value) =>{
    var fromDate = (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())
    setExcelUploadData({from_date:fromDate, to_date: toDate, integration_id:int_id, value:value})
  }
  
  
  useEffect(()=>{
    fetchIntegrations()
  }, [])


  const objToJson = (key, value) => {
    var res = {}
    res[key] = value
    ////console.log(res)
    return res
}

  const checkConnection = (item) =>{
    //console.log(item)
    if (item.integration_type==="offline"){
      return false
    }else{
      if(item.refresh_token_expired===true){
        return false
      }else{
        return true
      }
      //if (item.integration_type==="online"){
      //  if (item.inuit_company_id===null || item.refresh_token_expired===true || item.inuit_company_id===undefined){
      //    return false
      //  }else{
      //      return true
      //    }
      //    
      //  }else{
      //    if(item.refresh_token_expired==true){
      //      return false
      //    }else{
      //      return true
      //    }
      //  }
    }
  
      
    }


    ///////////// hotglue code here /////////////
    const options = {
      "hideBackButtons": true,
      "breadcrumbs": false,
      //"flow":hotglueFlowId,
      "tenantMetadata": metadata,
      "listener": {
        onSourceLinked:
        (source, flow) => {
          //sendData()
          connectAuth(int_id)
          createJob(flow, tenant)
          //setConnectModal(false)
         setSyncButtonLoading(false)
          

      },
        onSourceUnlinked:
        (source, flow) => { 
         disconnectAuth(int_id)
         //console.log(source)
         //console.log(flow)
         //setConnectModal(false)
         setSyncButtonLoading(false)

        },
        onPopupOpen:
        ()=>{
          
          setConnectModal(false)
          setSaveBtnLoading(false)

        },
        onPopupClose:
        ()=>{
          setSyncButtonLoading(false)
        },
        onWidgetClose:
        ()=>{
          setSyncButtonLoading(false)
        },
        
        onWidgetOpen:
        ()=>{
          setConnectModal(false)
          
          setSaveBtnLoading(false)

        }

      }
    }
  
   

    return (
      <>
        <Flex direction={'column'} gap={4}>
          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              size={'sm'}
              onClick={() => {
                setConnectModal(!connectModal)
              }}
            >
              <Icon as={FaPlus} />
              <Text>Add Integration</Text>
            </Button>
          </Flex>
          <Accordion allowToggle >
            {apps!==undefined? apps.map((item) => (
            <AccordionItem>
              <h3>
              <AccordionButton onClick={()=>{
                setInt_id(item.id)
                setTpc(item.tpc)
                setHotglueFlowId(item.flow_id)
                setSourceId(item.source_id)
                
                }}>
                <Box flex={1} textAlign={'left'} fontSize={'sm'}>
                  <Heading size={'sm'}>{item.app_name}</Heading>

                </Box>
                <Flex
                  flex={1}
                  justifyContent={'flex-end'}
                  gap={4}
                  alignItems={'center'}
                >
                  {item.integration_type==="offline"?
                   <Tag
                   colorScheme={'yellow'}
                   justifyContent={'center'}
                 >
                   Quickbooks Desktop
                 </Tag>
                  
                  :
                   <Tag
                   colorScheme={checkConnection(item)? 'green' : 'red'}
                   justifyContent={'center'}
                 >
                   {checkConnection(item)? item.integration_desc : item.integration_desc }
                 </Tag>
                  
                  }
                 
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              </h3>
              <AccordionPanel flexDirection={'column'} gap={3}>
                <Flex flex={1} gap={2} p={1} direction={'row'}>
                  {/*<Flex flex={1} gap={2} direction={'row'}>
                    <Text size={'xs'} as={'b'}>Intuit Company ID:</Text>
                    <Text  size={'xs'}>{item.inuit_company_id}</Text>
                </Flex>*/}
                <Flex flex={1} justifyContent={'start'} gap={2}>
                    <Text size={'xs'} as={'b'}>Integration Type:</Text>
                    <Text size={'xs'}>{item.integration_desc}</Text>
                  </Flex>
                <Flex flex={1} gap={2}>

                    <Text size={'xs'} as={'b'}>Date of last sync:</Text>
                    <Text  size={'xs'}>{item.date_updated}</Text>
                  </Flex>
                  
                </Flex>
                
                {item.integration_type==='online'?
                <Flex flex={1} justifyContent={'center'} gap={2}>
                  {/*<IconButton as={Button} icon={<IoMdRefresh />}  flex={1} onClick={() => { handleAuth(item.id) }} loading={syncButtonLoading}>
                    <Text p={2}>Connect to </Text></IconButton>*/}
                    <Flex  flex={1} justify={'end'} p={1}>
                      <Image src={qbBotton} onClick={() => { handleAuth(item.id) } } style={{cursor:'pointer'}}></Image>
                    </Flex>
                    <Flex flex={1} justify={'start'} p={1}>
                      <IconButton startIcon={<FaUnlink/>} 
                      color='red' 
                      appearance='primary' 
                      placement='right' 
                      disabled = {!checkConnection(item)}
                      onClick={()=>{
                        disconnectAuth(item.id)
                      }}>
                        <Text fontSize={'xl'} pl={5}>
                        Disconnect
                        </Text>
                      </IconButton>
                    </Flex>
                </Flex>:item.integration_type==='offline'?
                <Flex direction={'column'} gap={2} p={1}>
                <Flex gap={2}>
                  <Text size={'xs'} width={'40%'} as={'b'}>Date Range for data in excel upload:</Text>
                  <CustomDateRangePicker dateValue = {setFormDataDate} value = {excelUploadData['value']}/>
                </Flex>
                <Flex width={'100%'} justifyContent={'center'}>
                    <Uploader
                        listType="picture-text"
                        action={apiEndpoint + "/api/xls_fileupload_user/"}
                        draggable
                        autoUpload
                        headers={{ "Authorization": "Bearer " + localStorage['access'] }}
                        method='POST'
                        data={excelUploadData}
                        multiple={false}
                        accept='.xls,.csv,.xlsx'
                        disabledFileItem
                        disabled={excelUploadData['value']===''?true:limitUploader[item.id]===undefined?false:true}
                        onChange={(filelist)=>{

                          if(filelist.length>=1){
                            if (limitUploader.length===0){
                              setLimitUploader(objToJson(item.id, true))
                            }else{
                              limitUploader[item.id] = true
                              setLimitUploader(limitUploader)
                            }
                          }else{
                            if (limitUploader.length===0){
                              setLimitUploader(objToJson(item.id, false))
                            }else{
                              limitUploader[item.id] = false
                              setLimitUploader(limitUploader)
                            }
                          }
                        }
                      }
                        
                        
                        >
                        <div style={{width:500, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Click or Drag files to this area to upload. Files will get uploaded automatically</span>
                        </div>

                      </Uploader>
              </Flex>
                
                </Flex>:<>
                <Flex flex={1} justifyContent={'center'} gap={2}>
                  {/*<IconButton as={Button} icon={<IoMdRefresh />}  flex={1} onClick={() => { handleAuth(item.id) }} loading={syncButtonLoading}>
                    <Text p={2}>Connect to </Text></IconButton>*/}
                    
      
                      <Button  onClick={() => { 

                        //console.log(item.company_id_id + "_" + item.id)
                        setTenant(item.company_id_id + "_" + item.id)
                        setSyncButtonLoading(true)
                        options['tenantMetadata'] = metadata
                        console.log(options)
                        link(item.company_id_id + "_" + item.id, item.flow_id, item.source_id, false, options)
                       }} color='primary' block loading={syncButtonLoading}>Resync/Manage connection</Button>
 
                    
                </Flex>
                
                </>}
                
              </AccordionPanel>
            </AccordionItem>)) : <>
              
            
            </>
            }
          </Accordion>
        </Flex>

        {/*Modal*/}
        <Modal
          closeOnOverlayClick={false}
          isOpen={connectModal}
          onClose={()=>setConnectModal(!connectModal)}
        >
          <ModalOverlay />
          <ModalContent
            
          >
            <ModalHeader>Add Integrations</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction={'column'} gap={2}>
                <Flex gap={2} justify={'space-between'}>
                  <Flex justifyContent={'start'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xs'}>App Name</Text>
                      </FormLabel>
                      <Input type="text" id='appName' />
                    </FormControl>
                  </Flex>


                </Flex>
                <Flex>
                  <SelectPicker
                    data={integrationTypes}
                    menuStyle={{
                      zIndex:9999,
                     
                    }}
                    style={{
                      width:"100%"
                    }}
                    onChange={(value)=>{
                      setIntegration_type(value)
                      allIntegrationTypes.map((item)=>{
                        if (item.integration_type===value){
                          setTpc(item.tpc)
                          setCaptureLocationDisplay(item.capture_location)
                          setLocationAttrDisplay(item.location_attr)
                          setHotglueFlowId(item.flow_id)
                          setSourceId(item.source_id)
                        }
                      })
                    }}
                    />
  
             
                </Flex>
                {captureLocationDisplay?<Flex direction={'row'}>
                  <Flex alignItems={'center'} flex={1}>
                    
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xxs'}>Additional Drilldown</Text>
                      </FormLabel>
                      <Switch onChange={()=>{setCaptureLocation(!captureLocation)}} disabled={!captureLocationDisplay}/>
                    </FormControl>
                  </Flex>
                  <Flex alignItems={'center'} flex={1}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize={'xxs'}>{attributeType?"Location":"Class"} Attribute</Text>
                      </FormLabel>
                      <Switch onChange={()=>{setLocationAttr(!locationAttr)
                      setAttributeType(!attributeType)}} disabled={!locationAttrDisplay}/>
                    </FormControl>
                  </Flex>
                </Flex>:<></>}
                
              </Flex>

            </ModalBody>

            <ModalFooter>
              <Flex width={'100%'} gap={2} justifyContent={'center'}>
              
                <Button appearance='primary' onClick={() => {
                  if(tpc){
                    sendDataTPC()
                    ////console.log(val)
                    
                    //link(companyId+ "_" + int_id, hotglueFlowId, sourceId, false, options)
                  }else{
                    sendData()
                  }
                }} loading={saveBtnLoading} block>
                  Save
                </Button>
                <Button onClick={()=>{
                  setConnectModal(!connectModal)
                  }} flex={1} block>Cancel</Button>
              </Flex>

            </ModalFooter>
          </ModalContent>
        </Modal>


      
      </>
    );
                }


//export default WrappedComponent(IntegrationSetting);
