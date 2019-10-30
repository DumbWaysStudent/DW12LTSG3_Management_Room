import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft:10,
    marginTop: 20,
  },
  titleR: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft:10,
  },
  modal:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
  itemadd:{
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0
  },
  addtext:{
    backgroundColor: 'grey',
    marginBottom: 10,
    color: '#fff'
  },
  addbutton: {
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#4b4b4b',
    padding:0,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  editroom:{
    margin: 10,
    alignSelf: 'flex-start'
  },
  titleEdit:{
    fontSize: 20,
  },
  nameC: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  idcardC: {
    fontSize: 16,
  },
  phonenumberC: {
    fontSize: 16
  },
  cardright: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 0,
  },
  btnRoom: {
    backgroundColor: '#3d3d3d',
    width: 130,
    alignSelf: 'flex-end'
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleModal: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  },
  modalGeneral: {
    backgroundColor: '#3d3d3d',
    padding: 20,
    borderRadius: 20,
  },
  btnclose: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    top: 0
  },
  inputLight:{
    backgroundColor: '#fff',
    color: '#3d3d3d',
    fontWeight: 'bold',
    paddingLeft: 10,
    borderRadius: 10
  },
  item: {
    borderBottomWidth: 0,
    height:80,
    marginLeft: 0,
  },
  margin: {
    marginTop:0,
    color: '#fff',
    fontWeight: 'bold'
  },
  colorWhite: {
    color: '#3d3d3d',
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
  nodata: {
    margin:20,
    fontSize: 15
  }
})