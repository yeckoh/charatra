import { Component, OnInit } from '@angular/core';
import { CharaService } from '../shared/chara.service';

@Component({
  selector: 'app-secret-socket',
  templateUrl: './secret-socket.component.html',
  styleUrls: ['./secret-socket.component.css']
})
export class SecretSocketComponent implements OnInit {
    // tslint:disable: variable-name
  static mysock: any;
  constructor( private charaservice: CharaService) { }

/// ============================================================================================
// ROOM EMITTERS ===============================================================================
/// ============================================================================================
  // filter hook events by user
  // static joinUserRoom() {
  //   // call this when signing in
  //   // this is only for updating the character list in localstorage and the sidebar
  //   const room_identifier = JSON.parse(localStorage.getItem('user')).id;
  //   this.mysock.emit('Join_user_room', room_identifier);
  // }

  // // filter hook events by character
  // static joinCharacterRoom(characterid) {
  //   // call this when clicking on a specific character
  //   // this is for ignoring updates of all other characters not currently being viewed
  //   this.mysock.emit('Join_character_room', characterid);
  // }

  // static leaveCharacterRoom(characterid) {
  //   this.mysock.emit('Leave_character_room', characterid);
  // }

/// ============================================================================================
// ATTACK EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// CHARACTER EMITTERS ==========================================================================
/// ============================================================================================
  // request to CREATE_ONE
  // static newCharacter(incomingdata) {
  //   const forwardingdata = {
  //     userid: JSON.parse(localStorage.getItem('user')).id,
  //     name: incomingdata.name,
  //     gender: incomingdata.gender,
  //     race: incomingdata.race
  //   };
  //   this.mysock.emit('Make_new_chara', forwardingdata);
  // }

  // request to READ_ONE
  // static getSelectedCharacter(charaid) {
  //   const userAndCharacter_ids = {
  //     userid: JSON.parse(localStorage.getItem('user')).id, // probably not needed for read_one
  //     characterid: charaid,
  //   };
  //   this.mysock.emit('Get_selected_chara', userAndCharacter_ids);
  // }

  // request to UPDATE_ONE
  // static sendCharacterSelectedUpdate(chara) {
  //   const useridAndCharacter = {
  //     userid: JSON.parse(localStorage.getItem('user')).id, // needed for user room. purpose: update sidebar for namechange
  //     chara,
  //   };
  //   this.mysock.emit('Update_selected_chara', useridAndCharacter);
  // }

/// ============================================================================================
// CLASS EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// CONTAINER EMITTERS ============================================================================
/// ============================================================================================

static newContainer(charaid) {
  this.mysock.emit('Make_new_container', charaid);
}

static getCharaContainers(listofcontainerids) {
  this.mysock.emit('Get_all_chara_containers', listofcontainerids);
}

static updateSelectedContainer(container, charaid) {
  const charaidAndContainer = {
    container,
    charaid
  };
  this.mysock.emit('Update_selected_container', charaidAndContainer);
}

/// ============================================================================================
// EFFECT EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// FEATURE EMITTERS ============================================================================
/// ============================================================================================
  // // request to CREATE_ONE
  // static newFeature(owner) {
  //   /// TODO: add data to specify which chara.listof_ we are adding to!
  //   const forwardingdata = {
  //     chara_id: owner,
  //   };
  //   this.mysock.emit('Make_new_feature', forwardingdata);
  // }

  // // request to READ_ALL
  // static getManualFeatures(featurelist, chararoomid) {
  //   const charaAndManualFeature_ids = {
  //     charaid: chararoomid,
  //     featureids: featurelist
  //   };
  //   this.mysock.emit('Get_all_chara_features', charaAndManualFeature_ids);
  // }

  // // request to UPDATE_ONE
  // static UpdateSelectedFeature(feature, chararoomid) {
  //   console.log('socket sendfeatureselectedupatefunc');
  //   // send an emit.
  //   const forwardingdata = {
  //     feature,
  //     charaid: chararoomid
  //   };
  //   this.mysock.emit('Update_selected_feature', forwardingdata);
  // }

/// ============================================================================================
// ITEM EMITTERS ============================================================================
/// ============================================================================================

// request to CREATE_ONE
  static newItem(owner) {
    /// TODO: add data to specify which chara.listof_ we are adding to!
    const forwardingdata = {
      container_id: owner,
    };
    this.mysock.emit('Make_new_item', forwardingdata);
  }

  // request to READ_ALL
  static getItems(featurelist, chararoomid) {
    // I am uncertain how to handel this
  }

  static UpdateSelectedItem(item, chararoomid) {
    console.log('socket senditemselectedupatefunc');
    // send an emit.
    const forwardingdata = {
      item,
      charaid: chararoomid
    };
    this.mysock.emit('Update_selected_item', forwardingdata);
  }

/// ============================================================================================
// OTHERPROF EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// SAVETHROW EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// SKILLPROF EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// SPELLLIST EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// SPELL EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// ng stuff ====================================================================================
/// ============================================================================================

  // ngOnDestroy() { // this works for now
  //   SecretSocketComponent.mysock.disconnect();
  //   sessionStorage.clear();
  // }

/// ============================================================================================
// ALL HOOK LISTENERS ==========================================================================
// these define what events to listen for from the server -> angular
/// ============================================================================================

  ngOnInit() {
  //   this.connectToSocket();



    // ------------------------------------------------------------
    // ATTACK LISTEN HOOKS
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // CHARACTER LISTEN HOOKS
    // ------------------------------------------------------------
    // CREATE_ONE
    // SecretSocketComponent.mysock.on('Created_new_chara', (data) => {
    //   // get all characterids in user localstorage obj
    //   // append this new chara id
    //   // set localstorage new characterlist
    //   const userinfo = JSON.parse(localStorage.getItem('user'));
    //   userinfo.charas.push(data._id); // add id to list of charas
    //   localStorage.setItem('user', JSON.stringify(userinfo));
    //   // probably update the sidebar list here too
    //   SecretSocketComponent.getUserCharacters();
    //   console.log('created_one chara');
    // });


    // READ_ALL
    // SecretSocketComponent.mysock.on('Read_all_user_charas', (data) => {
    //   // pull all characters belonging to the logged-in user only
    //   this.charaservice.CharaAll = data;
    //   console.log('read_all charas');
    // });

    // READ / UPDATED_ONE
    // SecretSocketComponent.mysock.on('Updated_one_chara', (data) => {
    //   const replacementIndex = this.charaservice.CharaAll.findIndex(e => e._id === data._id);
    //   this.charaservice.CharaAll[replacementIndex] = data;
    //   // if (this.charaservice.CharaSelected !== undefined && this.charaservice.CharaSelected._id === data._id) {
    //   //   // if you're the caller, update your selection
    //   //   this.charaservice.CharaSelected = this.charaservice.CharaAll[replacementIndex];
    //   //   this.charaservice.CharaId = this.charaservice.CharaSelected._id;
    //   // }
    //   // this.charaservice.CharaSelected.stats.total_hitpoints = 54;
    //   // emit hooks to get all lvl-2 collections here?
    //   this.charaservice.CharaSelected = data;
    //   console.log(this.charaservice.CharaSelected);
    //   console.log('read_one chara');
    // });

    // if user is logged in already and just loaded the page
    // if (localStorage.getItem('user') != null) { // populates sidebar
    //   SecretSocketComponent.getUserCharacters();
    // }

    // ------------------------------------------------------------
    // CLASS LISTEN HOOKS
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // CONTAINER LISTEN HOOKS
    // ------------------------------------------------------------
    // CREATE_ONE
    // SecretSocketComponent.mysock.on('Created_new_container', (data) => {
    //   this.charaservice.CharaSelected.listof_characontainer.push(data._id); // add id to list of containers
    //   this.charaservice.ContainerAll.push(data);
    //   console.log('created_one chara container');
    // });














/*


    // READ_ALL
    SecretSocketComponent.mysock.on('Read_all_chara_containers', (data) => {
      this.charaservice.ContainerAll = data;
      console.log('read_all chara containers');
    });

    // UPDATE_ONE
    SecretSocketComponent.mysock.on('Updated_one_container', (data) => {
      const replacementIndex = this.charaservice.ContainerAll.findIndex(e => e._id === data._id);
      this.charaservice.ContainerAll[replacementIndex] = data;
      if (this.charaservice.ContainerSelected !== undefined && this.charaservice.ContainerSelected._id === data._id) {
        this.charaservice.ContainerSelected = this.charaservice.ContainerAll[replacementIndex];
      }
    });

    // ------------------------------------------------------------
    // EFFECT LISTEN HOOKS
    // ------------------------------------------------------------
    // CREATE_ONE
    SecretSocketComponent.mysock.on('Created_new_effect', (data) => {
      // add id to whichever feature is the owner
      // so find the right one
    });

    // ------------------------------------------------------------
    // FEATURE LISTEN HOOKS
    // ------------------------------------------------------------
    // CREATE_ONE
    SecretSocketComponent.mysock.on('Created_new_feature', (data) => {
      // this.charaservice.CharaSelected.listof_charafeatures.push(data._id); // add id to list of charafeatures
      this.charaservice.FeatureAll.push(data);
      console.log('created_one chara feature');
    });

    // READ_ALL
    SecretSocketComponent.mysock.on('Read_all_chara_features', (data) => {
      this.charaservice.FeatureAll = data;
      console.log('read_all chara features');
    });

    // UPDATE_ONE
    SecretSocketComponent.mysock.on('Updated_one_feature', (data) => {
      // you have to find the right one in the list and update it
      // this shouldn't ever fail to find
      const replacementIndex = this.charaservice.FeatureAll.findIndex(e => e._id === data._id);
      this.charaservice.FeatureAll[replacementIndex] = data;
      if (this.charaservice.FeatureSelected !== undefined && this.charaservice.FeatureSelected._id === data._id) {
        // if you're the caller, update your selection
        this.charaservice.FeatureSelected = this.charaservice.FeatureAll[replacementIndex];
      }
      console.log('updated_one feature');
    });

    // ------------------------------------------------------------
    // ITEM LISTEN HOOKS
    // ------------------------------------------------------------
    // CREATE_ONE

    // READ_ALL
    SecretSocketComponent.mysock.on('Read_all_chara_items', (data) => {
      // To Do: implement function to handel this LISTENER
    });

    // UPDATE_ONE
    SecretSocketComponent.mysock.on('Updated_one_item', (data) => {
      // To Do: implement function to handel this LISTENER
    });

    // ------------------------------------------------------------
    // OTHERPROF LISTEN HOOKS
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // SAVETHROW LISTEN HOOKS
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // SKILLPROF LISTEN HOOKS
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // SPELLLIST LISTEN HOOKS
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // SPELL LISTEN HOOKS
    // ------------------------------------------------------------
*/
  }










  // connectToSocket() {
  //   SecretSocketComponent.mysock = wsocket('http://localhost:3000');
  //   if (localStorage.getItem('user') != null) {
  //     SecretSocketComponent.joinUserRoom();
  //   }
  // }














}
