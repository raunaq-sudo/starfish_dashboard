import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
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
import { IconButton, Stack,Button, Uploader, DateRangePicker, SelectPicker, Checkbox } from 'rsuite';
import inuit from '../../config/inuitConfig';
import apiEndpoint from '../../config/data';
import { compareAsc, isThisSecond } from 'date-fns';
import CustomDateRangePicker from '../../utility/dateRangePicker';
import qbBotton from '../../../media/images/quickbookButton.png'
import { useHotglue } from '@hotglue/widget';
import { array } from 'i/lib/util';
import { Select } from 'chakra-react-select';
import store from '../../../redux/store'
import { useSelector, useDispatch } from 'react-redux'


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
    const [int_id, setInt_id] = useState('')
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
    const [periodTypes, setPeriodTypes] = useState([])
    const [periodCalType, setPeriodCalType] = useState('')
    const [periodCalTypeInt, setPeriodCalTypeInt] = useState('')
    const [periodCalTypeFlag, setPeriodCalTypeFlag] = useState(false)
    const [periodCalTypeFlagInt, setPeriodCalTypeFlagInt] = useState(false)
    const [companySwitcherActive, setCompanySwitcherActive] = useState(undefined)
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
    const [country, setCountry] = useState()
    const [countrySelected, setCountrySelected] = useState()
    const [mapIntegrationCountry, setMapIntegrationCountry] = useState()
    const [defaultPeriod, setDefaultPeriod] = useState('')
    const [cashAc, setCashAc] = useState('')
    const [cashAcInt, setCashAcInt] = useState('')
    const [editButtonLoading, setEditButtonLoading] = useState(false)
    const [sendEditDataFlag, setSendEditDataFlag] = useState(false)
    
    const cashAccData = [{
      value:'Cash', label:'Cash'
    },{
      value:'Accrual', label:'Accrual'
    },

  ]


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

useEffect(()=>{
  sendEditData()
}, [sendEditDataFlag])

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
        var ptype = []
        data['period_types'].map((item)=>ptype.push({value:item,label:item}))
        setMetadata(data['metadata'])
        console.log("Metadata")
        console.log(metadata)
        setIntegrationTypes(itype)
        setPeriodTypes(ptype)
        setDefaultPeriod(data['default_period'])
      }).catch(err => {
        //console.error(err)
        alert('Error occured.')
      })
  }



  const sendData = async () =>{
    setSaveBtnLoading(true)
    var data = new FormData()
    if (document.getElementById('appName').value === ''){
      setSaveBtnLoading(false)
      alert("Please enter the integration name")
    
    }else{
      data.append('app_name',document.getElementById('appName').value)
      data.append('integration_type',integration_type)
      data.append('capture_location',captureLocation?'true':'false')
      data.append('location_attr',locationAttr?'true':'false')
      data.append('country', countrySelected)
      data.append('period_cal',periodCalTypeFlag)
      data.append('period_cal_type', periodCalType)
      data.append('cashAc', cashAc)
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
  }

  const sendEditData = async () =>{
    setEditButtonLoading(true)
    var data = new FormData()    
    data.append('integrationId', int_id)
    data.append('periodCal', periodCalType)
    data.append('periodFlag', periodCalTypeFlagInt)
    data.append('cashAc', cashAcInt)
    await fetch(apiEndpoint + '/api/edit_integration/',{
      headers: { "Authorization": "Bearer " + localStorage['access'] },
      method:'POST',
      body:data
    }).then(response=>response.json())
    .then(data=>{


    }).catch((err)=>alert("Error Occured!."))

    fetchIntegrations()

    setEditButtonLoading(false)

}


  const sendDataTPC = async () =>{
    setCompanyId(undefined)
    setInt_id(undefined)
    setSaveBtnLoading(true)
    var data = new FormData()
    if (document.getElementById('appName').value === ''){
      setSaveBtnLoading(false)
      alert("Please enter the integration name")
    
    }else{

    data.append('app_name',document.getElementById('appName').value)
    data.append('integration_type',integration_type)
    data.append('capture_location',captureLocation?'true':'false')
    data.append('location_attr',locationAttr?'true':'false')
    data.append('country', countrySelected)
    data.append('period_cal',periodCalTypeFlag)
    data.append('period_cal_type', periodCalType)
    data.append('cashAc', cashAc)

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


  const setFormDataDate = (value, intId) =>{
    var fromDate = value!==undefined && (((value[0].getMonth() > 8) ? (value[0].getMonth() + 1) : ('0' + (value[0].getMonth() + 1))) + '-' + ((value[0].getDate() > 9) ? value[0].getDate() : ('0' + value[0].getDate())) + '-' + value[0].getFullYear())
    var toDate = value!==undefined && (((value[1].getMonth() > 8) ? (value[1].getMonth() + 1) : ('0' + (value[1].getMonth() + 1))) + '-' + ((value[1].getDate() > 9) ? value[1].getDate() : ('0' + value[1].getDate())) + '-' + value[1].getFullYear())
    console.log(fromDate)
    setExcelUploadData({from_date:fromDate, to_date: toDate, integration_id:intId, value:value})
    console.log(excelUploadData)
    console.log({from_date:fromDate, to_date: toDate, integration_id:intId, value:value})
  }
  
  function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

  const fetchCountry = () =>{
    fetch(apiEndpoint + '/api/country/', {
      method: 'GET',
    }).then(response => response.json()).then((data) => {
      data.forEach(obj=>obj['country_currency'] = obj['country_label'] + " (" + obj['currency'] + ") ")
      console.log(data)
      data.forEach( obj => renameKey( obj, 'country_currency', 'label' ) );
      data.forEach( obj => renameKey( obj, 'country_id', 'value' ) );
      setCountry(data)
      console.log(data)
    }).catch(err => console.error(err))
  }
  
  useEffect(()=>{
    fetchIntegrations()
    fetchCountry()
    const state = store.getState()
    setCompanySwitcherActive(state.dateFormat.companySwitcherActive)
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
  
   const returnCurrencyFromCountry = (countryInput)=>{
    var currency = ""
    if (country!==undefined){
      country.map((obj)=>obj['value']==countryInput?currency = obj['country_label'] + " (" + obj['currency']+")":"")
      //console.log("Currency Test")
      console.log(currency)
    }
   
    return currency
   }

    return (
      <Card p={1} minH={700}>
        <CardHeader p={2}>
        
          <Flex width={'100%'} justifyContent={'flex-end'}>
            <Button
              size={'sm'}
              onClick={() => {
                setConnectModal(!connectModal)
                setPeriodCalTypeFlag(false)
                setSaveBtnLoading(false)
              }}
            >
              <Icon as={FaPlus} />
              <Text>Add Integration</Text>
            </Button>
          </Flex>

          </CardHeader>
          <CardBody>
          <Flex direction={'column'} gap={4}>
          <Accordion allowToggle>
            {apps!==undefined? apps.map((item) => (
            <AccordionItem>
              <h3>
                <AccordionButton
                  onClick={() => {
                    setInt_id(item.id);
                    setTpc(item.tpc);
                    setHotglueFlowId(item.flow_id);
                    setSourceId(item.source_id);
                    setPeriodCalTypeFlagInt(item.period_cal);
                    setPeriodCalTypeInt(item.period_cal_type);
                    setCashAcInt(item.cash_accrual);
                  }}
                >
                  <Box flex={1} textAlign={'left'} fontSize={{ base: 'xs', md: 'sm' }}>
                    <Heading size={{ base: 'xs', md: 'sm' }}>{item.app_name}</Heading>
                  </Box>
                  <Flex
                    flex={1}
                    justifyContent={'flex-end'}
                    gap={{ base: 2, md: 4 }}
                    alignItems={'center'}
                    direction={{ base: 'column', sm: 'row' }}
                  >
                    {item.integration_type === 'offline' ? (
                      <Tag colorScheme={'yellow'} justifyContent={'center'}>
                        Quickbooks Desktop
                      </Tag>
                    ) : (
                      <Tag
                        colorScheme={checkConnection(item) ? 'green' : 'red'}
                        justifyContent={'center'}
                      >
                        {checkConnection(item)
                          ? item.integration_desc
                          : item.integration_desc}
                      </Tag>
                    )}
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h3>

              <AccordionPanel flexDirection={{ base: 'column', md: 'row' }} gap={3}>
                <Flex flex={1} gap={2} p={1} direction={{ base: 'column', md: 'row' }}>
                  <Flex flex={1} justifyContent={{ base: 'start', md: 'start' }} gap={2}>
                    <Text size={'xs'} as={'b'}>Integration Type:</Text>
                    <Text size={'xs'}>{item.integration_desc}</Text>
                  </Flex>

                  <Flex flex={1} justifyContent={{ base: 'start', md: 'start' }} gap={2}>
                    <Text size={'xs'} as={'b'}>Currency:</Text>
                    <Text size={'xs'}>{returnCurrencyFromCountry(item.country)}</Text>
                  </Flex>

                  <Flex flex={1} justifyContent={{ base: 'start', md: 'start' }} gap={2}>
                    <Text size={'xs'} as={'b'}>Date of last sync:</Text>
                    <Text size={'xs'}>{item.date_updated}</Text>
                  </Flex>
                </Flex>

                {companySwitcherActive ? (
                  <Flex direction={{ base: 'column', md: 'row' }} flex={1} gap={2} marginBottom={2}>
                    <FormControl>
                      <Flex align={{ base: 'center', md: 'start' }}>
                        <FormLabel alignItems={'center'} marginTop={2}>
                          <Text fontSize={'xs'}>Activate periods</Text>
                        </FormLabel>
                        <Checkbox
                          id="periodCal"
                          checked={periodCalTypeFlagInt}
                          onChange={() => {
                            setPeriodCalTypeFlagInt(!periodCalTypeFlagInt);
                            setSendEditDataFlag(!sendEditDataFlag);
                          }}
                        />
                      </Flex>
                    </FormControl>

                    <SelectPicker
                      data={periodTypes}
                      menuStyle={{ zIndex: 9999 }}
                      loading={editButtonLoading}
                      style={{ width: '100%', borderColor: 'black' }}
                      disabled={!periodCalTypeFlagInt}
                      onSelect={(value) => {
                        setPeriodCalType(value);
                        setSendEditDataFlag(!sendEditDataFlag);
                        console.log(value)
                      }}
                      placeholder={
                        item.period_cal_type !== undefined
                          ? item.period_cal_type
                          : 'Select Period Calendar type.'
                      }
                      defaultValue={item.period_cal_type}
                    />
                  </Flex>
                ) : null}

                {item.integration_type === 'online' ? (
                  <>
                    <Flex gap={2} direction={{ base: 'column', md: 'row' }}>
                      <Flex flex={1} direction={'column'}>
                        <SelectPicker
                          data={cashAccData}
                          menuStyle={{ zIndex: 9999 }}
                          style={{ width: '100%' }}
                          onChange={(value) => setCashAcInt(value)}
                          onClean={() => setCashAcInt('')}
                          placeholder={cashAcInt === '' ? 'Select Cash or Accrual' : cashAcInt}
                          defaultValue={item.cash_accrual}
                        />
                      </Flex>
                      <Button
                        color="primary"
                        loading={editButtonLoading}
                        disabled={!periodCalTypeFlagInt && cashAcInt === ''}
                        onClick={() => setSendEditDataFlag(!sendEditDataFlag)}
                      >
                        Edit
                      </Button>
                    </Flex>

                    <Flex flex={1} justifyContent={'center'} gap={2} wrap={{ base: 'wrap', md: 'nowrap' }}>
                      <Flex flex={1} justify={'end'} p={1}>
                        <Image
                          src={qbBotton}
                          onClick={() => handleAuth(item.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </Flex>
                      <Flex flex={1} justify={'start'} p={1}>
                        <IconButton
                          startIcon={<FaUnlink />}
                          color="red"
                          appearance="primary"
                          placement="right"
                          disabled={!checkConnection(item)}
                          onClick={() => disconnectAuth(item.id)}
                        >
                          <Text fontSize={'xl'} pl={5}>
                            Disconnect
                          </Text>
                        </IconButton>
                      </Flex>
                    </Flex>
                  </>
                ) : item.integration_type === 'offline' ? (
                  <Flex direction={'column'} gap={2} p={1}>
                    <Flex gap={2} wrap={{ base: 'wrap', md: 'nowrap' }}>
                      <Text size={'xs'} width={'40%'} as={'b'}>
                        Date Range for data in Excel upload:
                      </Text>
                      <DateRangePicker
                        appearance="default"
                        cleanable={false}
                        placeholder="Date Range"
                        placement={'auto'}
                        menuAutoWidth={window.screen.width > 500 ? false : true}
                        style={{ width: '100%', minWidth: '200px' }}
                        block
                        size="sm"
                        showOneCalendar
                        format={store.getState().dateFormat.value}
                        onOk={(value) => setFormDataDate(value, item.id)}
                      />
                    </Flex>

                    <Flex width={'100%'} justifyContent={'center'}>
                      <Uploader
                        listType="picture-text"
                        action={`${apiEndpoint}/api/xls_fileupload_user/`}
                        draggable
                        autoUpload
                        headers={{ Authorization: `Bearer ${localStorage['access']}` }}
                        method="POST"
                        data={excelUploadData}
                        multiple={false}
                        accept=".xls,.csv,.xlsx"
                        disabledFileItem
                        disabled={
                          excelUploadData['value'] === ''
                            ? true
                            : limitUploader[item.id] === undefined
                            ? false
                            : true
                        }
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
                        }}
                      >
                        <div
                          style={{
                            width: 500,
                            height: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span>
                            Click or Drag files to this area to upload. Files will get uploaded automatically
                          </span>
                        </div>
                      </Uploader>
                    </Flex>
                  </Flex>
                ) : (
                  <Flex flex={1} justifyContent={'center'} gap={2}>
                    <Button
                      onClick={() => {
                        setTenant(`${item.company_id_id}_${item.id}`);
                        setSyncButtonLoading(true);
                        options['tenantMetadata'] = metadata;
                        link(item.company_id_id + '_' + item.id, item.flow_id, item.source_id, false, options);
                      }}
                      color="primary"
                      block
                      loading={syncButtonLoading}
                    >
                      Resync/Manage connection
                    </Button>
                  </Flex>
                )}
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
          onClose={() => setConnectModal(!connectModal)}
          size={{ base: 'sm', md: 'lg', lg: '3xl' }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold">
              Add Integrations
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex direction="column" gap={4}>
                {/* App Name Input */}
                <FormControl>
                  <FormLabel>
                    <Text fontSize="sm">App Name</Text>
                  </FormLabel>
                  <Input
                    type="text"
                    id="appName"
                    placeholder="Enter App Name"
                    size="sm"
                  />
                </FormControl>

                {/* Country Selector */}
                <FormControl>
                  <FormLabel>
                    <Text fontSize="sm">Country</Text>
                  </FormLabel>
                  <SelectPicker
                    data={country}
                    menuStyle={{
                      zIndex: 9999,
                      maxHeight: '100%', // Restrict the dropdown width to the SelectPicker's width
                      overflowX: 'auto', // Enable vertical scrolling
                      maxWidth: '200px', // Set a maximum height for the dropdown
                    }}
                    style={{ width: '100%' }}
                    placeholder="Select Country"
                    onChange={(value) => setCountrySelected(value)}
                  />
                </FormControl>

                {/* Integration Type Selector */}
                <FormControl>
                  <FormLabel>
                    <Text fontSize="sm">Integration Type</Text>
                  </FormLabel>
                  <SelectPicker
                    data={integrationTypes}
                    menuStyle={{
                      zIndex: 9999,
                      maxHeight: '100%', // Restrict the dropdown width to the SelectPicker's width
                      overflowX: 'auto', // Enable vertical scrolling
                      maxWidth: '200px', // Set a maximum height for the dropdown
                    }}
                    style={{ width: '100%' }}
                    placeholder="Select Integration Type"
                    onChange={(value) => {
                      setIntegration_type(value);
                      allIntegrationTypes.forEach((item) => {
                        if (item.integration_type === value) {
                          setTpc(item.tpc);
                          setCaptureLocationDisplay(item.capture_location);
                          setLocationAttrDisplay(item.location_attr);
                          setHotglueFlowId(item.flow_id);
                          setSourceId(item.source_id);
                        }
                      });
                    }}
                  />
                </FormControl>

                {/* Period Calendar Options */}
                {companySwitcherActive && (
                  <Flex direction="column" gap={2}>
                    <FormControl>
                      <Checkbox
                        id="periodCal"
                        onChange={() => {
                          setPeriodCalTypeFlag(!periodCalTypeFlag);
                          setPeriodCalType(defaultPeriod);
                        }}
                      >
                        <Text fontSize="sm">Activate Periods</Text>
                      </Checkbox>
                    </FormControl>
                    <SelectPicker
                      data={periodTypes}
                      menuStyle={{
                        zIndex: 9999,
                        maxHeight: '100%', // Restrict the dropdown width to the SelectPicker's width
                        overflowX: 'auto', // Enable vertical scrolling
                        maxWidth: '200px', // Set a maximum height for the dropdown
                      }}
                      style={{ width: '100%' }}
                      placeholder={defaultPeriod}
                      disabled={!periodCalTypeFlag}
                      defaultValue={defaultPeriod}
                      onChange={(value) => setPeriodCalType(value)}
                    />
                  </Flex>
                )}

                {/* Cash or Accrual Selector */}
                <FormControl>
                  <FormLabel>
                    <Text fontSize="sm">Accounting Type</Text>
                  </FormLabel>
                  <SelectPicker
                    data={cashAccData}
                    menuStyle={{
                      zIndex: 9999,
                      maxHeight: '100%', // Restrict the dropdown width to the SelectPicker's width
                      overflowX: 'auto', // Enable vertical scrolling
                      maxWidth: '200px', // Set a maximum height for the dropdown
                    }}
                    style={{ width: '100%' }}
                    placeholder="Select Cash or Accrual"
                    onChange={(value) => setCashAc(value)}
                  />
                </FormControl>

                {/* Additional Drilldown Options */}
                {captureLocationDisplay && (
                  <Flex direction="row" gap={4}>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize="sm">Additional Drilldown</Text>
                      </FormLabel>
                      <Switch
                        onChange={() => setCaptureLocation(!captureLocation)}
                        isDisabled={!captureLocationDisplay}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <Text fontSize="sm">
                          {attributeType ? 'Location' : 'Class'} Attribute
                        </Text>
                      </FormLabel>
                      <Switch
                        onChange={() => {
                          setLocationAttr(!locationAttr);
                          setAttributeType(!attributeType);
                        }}
                        isDisabled={!locationAttrDisplay}
                      />
                    </FormControl>
                  </Flex>
                )}
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Flex w="100%" justify="space-between" gap={4}>
                <Button
                  appearance="primary"
                  onClick={() => {
                    if (tpc) {
                      sendDataTPC();
                    } else {
                      sendData();
                    }
                  }}
                  loading={saveBtnLoading}
                  block
                  flex={1}
                  height="40px"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setConnectModal(!connectModal)}
                  block
                  flex={1}
                  height="40px"
                  style={{marginTop:'0px'}}
                >
                  Cancel
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>


        </CardBody>
      </Card>
    );
                }


//export default WrappedComponent(IntegrationSetting);
