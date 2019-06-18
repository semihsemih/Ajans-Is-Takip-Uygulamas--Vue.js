import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedLists: [],
    user: null,
    loading: false,
    error: null,
    workLists: []
  },
  mutations: {
    setLoadedLists(state, payload) {
      state.loadedLists = payload;
    },
    updateLoadedList(state, payload) {
      const tableList = state.loadedLists.find(tableList => {
        return tableList.id === payload.id
      })
      if (payload.tableName)
        tableList.tableName = payload.tableName
      if (payload.tableCustomer)
        tableList.tableCustomer = payload.tableCustomer
      if (payload.tableSubject)
        tableList.tableSubject = payload.tableSubject
    },
    createList(state, payload) {
      state.loadedLists.push(payload);
    },
    saveWorkList(state, payload) {
      state.workLists.push(payload);
    },
    updateWorkList(state, payload) {
      const workList = state.workLists.find(workList => {
        return workList.id === payload.id
      })
      if(payload.category) 
        workList.category = payload.category
      if(payload.content) 
        workList.content = payload.content
      if(payload.contentDescription) 
        workList.contentDescription = payload.contentDescription
      if(payload.startDate) 
        workList.startDate = payload.startDate
      if(payload.finishDate) 
        workList.finishDate = payload.finishDate
      if(payload.advBudget) 
        workList.advBudget = payload.advBudget
      if(payload.advPeriod) 
        workList.advPeriod = payload.advPeriod
    },
    setLoadedWorkLists(state, payload) {
      state.workLists = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state, payload) {
      state.error = null;
    }
  },
  actions: {
    loadLists({commit}) {
      commit("setLoading", true);
      firebase
        .firestore()
        .collection("lists")
        .get()
        .then((querySnapshot) => {
        const lists = []

        querySnapshot.forEach((doc) => {
          lists.push({
            id: doc.id,
            tableName: doc.data().tableName,
            tableSubject: doc.data().tableSubject,
            tableCustomer: doc.data().tableCustomer
          })
        })
          commit("setLoadedLists", lists);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", true);
        });
    },
    createList({commit}, payload) {
      const list = {
        tableName: payload.tableName,
        tableSubject: payload.tableSubject,
        tableCustomer: payload.tableCustomer
      };
      firebase
        .firestore()
        .collection("lists")
        .add(list)
        .then(data => {
          commit("createList", {
            ...list,
            id: data.id
          });
        })
        .catch(error => {
          console.log(error);
        });

    },
    updateTableList({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if(payload.tableName) 
        updateObj.tableName = payload.tableName
      if(payload.tableCustomer) 
        updateObj.tableCustomer = payload.tableCustomer
      if(payload.tableSubject) 
        updateObj.tableSubject = payload.tableSubject
      
      firebase
        .firestore()
        .collection('lists')
        .doc(payload.id)
        .update(updateObj)
          .then(() => {
            commit('setLoading', false)
            commit('updateLoadedList', payload)       
          })
          .catch(error => {
            console.log(error)
            commit('setLoading', false  )
          })
      
    },
    removeTableList({commit}, payload) {
      firebase
        .firestore()
        .collection("work_lists")
        .where("tableId", '==', payload)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete()
          })
        })
        .then(() => {
          firebase
            .firestore()
            .collection('lists')
            .doc(payload)
            .delete()
        })
      },
    loadWorkLists({commit}, tableId) {
      commit("setLoading", true);
      firebase
        .firestore()
        .collection("work_lists")
        .where("tableId", '==', tableId)
        .get()
        .then((querySnapshot) => {
          const lists = [];

          querySnapshot.forEach((doc) => {
            lists.push({
              id: doc.id,
              category: doc.data().category,
              content: doc.data().content,
              contentDescription: doc.data().contentDescription,
              startDate: doc.data().startDate,
              finishDate: doc.data().finishDate,
              advBudget: doc.data().advBudget,
              advPeriod: doc.data().advPeriod,
              tableId: doc.data().tableId
            })
          })
          commit("setLoadedWorkLists", lists);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", true);
        });

      /* Pagination*/

      firebase
        .firestore()
        .collection('work_lists')
        .where("tableId", "==", tableId)
        .limit(5)
        .get()
        .then((querySnapshot) => {
          const firstList = []

          querySnapshot.forEach((doc) => {
            firstList.push({
              id: doc.id,
              category: doc.data().category,
              content: doc.data().content,
              contentDescription: doc.data().contentDescription,
              startDate: doc.data().startDate,
              finishDate: doc.data().finishDate,
              advBudget: doc.data().advBudget,
              advPeriod: doc.data().advPeriod,
              tableId: doc.data().tableId
            })
          })

          console.log(firstList)
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
          console.log("last", lastVisible);
          console.log(querySnapshot.size)

          var next = firebase.firestore().collection('work_lists')
                      .where("tableId", "==", tableId)  
                      .startAfter(lastVisible)
                      .limit(5)
                      .get()
                      .then((query) => {
                        const nextList = [];

                        query.forEach((doc) => {
                          nextList.push({
                            id: doc.id,
                            category: doc.data().category,
                            content: doc.data().content,
                            contentDescription: doc.data().contentDescription,
                            startDate: doc.data().startDate,
                            finishDate: doc.data().finishDate,
                            advBudget: doc.data().advBudget,
                            advPeriod: doc.data().advPeriod,
                            tableId: doc.data().tableId
                          })
                        })
                        console.log(nextList)
                      })

          return next;
        })
    },
    saveWorkList({commit}, payload) {
      const list = {
        category: payload.category,
        content: payload.content,
        contentDescription: payload.contentDescription,
        startDate: payload.startDate,
        finishDate: payload.finishDate,
        advBudget: payload.advBudget,
        advPeriod: payload.advPeriod,
        tableId: payload.tableId
      };
      firebase
        .firestore()
        .collection("work_lists")
        .add(list)
        .then(data => {
          commit("saveWorkList", {
            ...list,
            id: data.id
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateWorkList({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if(payload.category) 
        updateObj.category = payload.category
      if(payload.content) 
        updateObj.content = payload.content
      if(payload.contentDescription) 
        updateObj.contentDescription = payload.contentDescription
      if(payload.startDate) 
        updateObj.startDate = payload.startDate
      if(payload.finishDate) 
        updateObj.finishDate = payload.finishDate
      if(payload.advBudget) 
        updateObj.advBudget = payload.advBudget
      if(payload.advPeriod) 
        updateObj.advPeriod = payload.advPeriod
      firebase
        .firestore()
        .collection('work_lists')
        .doc(payload.id)
        .update(updateObj)
          .then(() => {
            commit('setLoading', false)
            commit('updateWorkList', payload)       
          })
          .catch(error => {
            console.log(error)
            commit('setLoading', false  )
          })
    },
    removeWorkList({commit}, payload) {
      firebase
        .firestore()
        .collection('work_lists')
        .doc(payload.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    signUserUp({commit}, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredLists: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({commit}, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredLists: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    autoSignIn({commit}, payload) {
      commit("setUser", {
        id: payload.uid
      });
    },
    logout({commit}) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    clearError({commit}) {
      commit("clearError");
    }
  },
  getters: {
    loadedLists(state) {
      return state.loadedLists.sort((listA, listB) => {
        return listA.createDate < listB.createDate;
      });
    },
    loadedListInfo(state) {
      return listId => {
        return state.loadedLists.find(list => {
          return list.id === listId;
        });
      };
    },
    workLists(state) {
      return state.workLists;
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
});