
import * as firebase from 'firebase'

export default {

    state: {
        user: null,
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {

        signUserUp ({commit}, payload) {
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: [],
                            fbKeys: {}
                        }
                        commit('setUser',newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading',false)
                        commit('setError',error)
                        console.log(error)
                    }
                )

        },
        signUserIn ({commit}, payload) {
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: [],
                            fbKeys: {}
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading',false)
                        commit('setError',error)
                        console.log(error)
                    }
                )

        },
        autoSignIn ({commit}, payload) {
            commit('setUser',{
                id: payload.uid,
                registeredMeetups: [],
                fbKeys: {}
            })
        },
        fetchUserData({commit, getters}) {
            commit('setLoading',true)
            firebase.database().ref('/Users/' + getters.user.id + '/Registrations/').once('value')
                .then(data => {
                    const dataPairs = data.val()
                    let registeredMeetups = []
                    let swappedPairs = {}
                    for (let key in dataPairs) {
                        registeredMeetups.push(dataPairs[key])
                        swappedPairs[dataPairs[key]] = key
                    }
                    const updatedUser = {
                        id: getters.user.id,
                        registeredMeetups: registeredMeetups,
                        fbKeys: swappedPairs
                    }
                    commit('setLoading', false)
                    commit('setUser', updatedUser)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        logout ({commit}) {
            firebase.auth().signOut();
            commit('setUser',null)
        },
    },
    getters: {
        user (state) {
            return state.user
        }
    }

}
