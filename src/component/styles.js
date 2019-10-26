import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 40,
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
  modal:{
    backgroundColor: '#fff',
    margin:0,
    marginTop: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
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
    marginRight: 20
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
  }
})