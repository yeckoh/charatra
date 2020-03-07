import { Component, OnInit, OnDestroy } from '@angular/core';
import * as wsocket from 'socket.io-client';
import { CharaService } from '../shared/chara.service';
import { Features } from '../shared/features.model';

@Component({
  selector: 'app-secret-socket',
  templateUrl: './secret-socket.component.html',
  styleUrls: ['./secret-socket.component.css']
})
export class SecretSocketComponent implements OnInit, OnDestroy {
    // tslint:disable: variable-name
  static mysock: any;
  constructor( private charaservice: CharaService) { }

/// ============================================================================================
// ROOM EMITTERS ===============================================================================
/// ============================================================================================
  // filter hook events by user
  static joinUserRoom() {
    // call this when signing in
    // this is only for updating the character list in localstorage and the sidebar
    const room_identifier = JSON.parse(localStorage.getItem('user')).id;
    this.mysock.emit('Join_user_room', room_identifier);
  }

  // filter hook events by character
  static joinCharacterRoom(characterid) {
    // call this when clicking on a specific character
    // this is for ignoring updates of all other characters not currently being viewed
    this.mysock.emit('Join_character_room', characterid);
  }

  static leaveCharacterRoom(characterid) {
    this.mysock.emit('Leave_character_room', characterid);
  }

/// ============================================================================================
// ATTACK EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// CHARACTER EMITTERS ==========================================================================
/// ============================================================================================
  // send an event to the hook, 'Make_new_chara'
  static newCharacter(incomingdata) {
    const forwardingdata = {
      userid: JSON.parse(localStorage.getItem('user')).id,
      name: incomingdata.name,
      gender: incomingdata.gender,
      race: incomingdata.race
    };
    this.mysock.emit('Make_new_chara', forwardingdata);
  }

  // send an event to the hook, 'Get_all_user_charas'
  static getUserCharacters() {
    const userAndCharacter_ids = {
      userid: JSON.parse(localStorage.getItem('user')).id,
      characterids: JSON.parse(localStorage.getItem('user')).charas
    };
    this.mysock.emit('Get_all_user_charas', userAndCharacter_ids);
  }

  // name implies getUserCharacters was already called
  static getSelectedCharacter(desiredcharacterid) {
    const userAndCharacter_ids = {
      userid: JSON.parse(localStorage.getItem('user')).id,
      characterid: desiredcharacterid,
    };
    this.mysock.emit('Get_selected_chara', userAndCharacter_ids);
  }

/// ============================================================================================
// CLASS EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// CONTAINER EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// EFFECT EMITTERS ============================================================================
/// ============================================================================================


/// ============================================================================================
// FEATURE EMITTERS ============================================================================
/// ============================================================================================
  // create new
  static newFeature(owner) {
    /// TODO: add data to specify which chara.listof_ we are adding to!
    const forwardingdata = {
      chara_id: owner,
    };
    this.mysock.emit('Make_new_feature', forwardingdata);
  }

  static getManualFeatures(featurelist, chararoomid) {
    const charaAndManualFeature_ids = {
      charaid: chararoomid,
      featureids: featurelist
    };
    this.mysock.emit('Get_all_chara_features', charaAndManualFeature_ids);
  }

  // update existing
  static featureUpdate(feature) {
    // send an emit.
  }

/// ============================================================================================
// ITEM EMITTERS ============================================================================
/// ============================================================================================


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

  ngOnDestroy() { // this works for now
    SecretSocketComponent.mysock.disconnect();
    sessionStorage.clear();
  }

/// ============================================================================================
// ALL HOOK LISTENERS ==========================================================================
// these define what events to listen for from the server -> angular
/// ============================================================================================

  ngOnInit() {
    this.connectToSocket();



    // ------------------------------------------------------------
    // ATTACK LISTEN HOOKS
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // CHARACTER LISTEN HOOKS
    // ------------------------------------------------------------
    // define a hook to listen for, called 'Made_new_chara'
    SecretSocketComponent.mysock.on('Made_new_chara', (data) => {
      // get all characterids in user localstorage obj
      // append this new chara id
      // set localstorage new characterlist
      const userinfo = JSON.parse(localStorage.getItem('user'));
      userinfo.charas.push(data._id);
      localStorage.setItem('user', JSON.stringify(userinfo));
      // probably update the sidebar list here too
      SecretSocketComponent.getUserCharacters();
    });

    // define hook to listen for, called 'Receive_all_user_charas'
    SecretSocketComponent.mysock.on('Receive_all_user_charas', (data) => {
      // pull all characters belonging to the logged-in user only
      this.charaservice.CharaAll = data;
    });

    SecretSocketComponent.mysock.on('Receive_desired_chara', (data) => {
      this.charaservice.CharaSelected = data;
      // emit hooks to get all lvl-2 collections here?
    });

    // if user is logged in already and just loaded the page
    if (localStorage.getItem('user') != null) { // populates sidebar
      SecretSocketComponent.getUserCharacters();
    }

    // ------------------------------------------------------------
    // CLASS LISTEN HOOKS
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // CONTAINER LISTEN HOOKS
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // EFFECT LISTEN HOOKS
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // FEATURE LISTEN HOOKS
    // ------------------------------------------------------------
    SecretSocketComponent.mysock.on('Made_new_feature', (data) => {
      console.log('push new feature id to chara.listof_manual');
      this.charaservice.CharaSelected.listof_charamanualfeatures.push(data._id);
      SecretSocketComponent.getManualFeatures(this.charaservice.CharaSelected.listof_charamanualfeatures, this.charaservice.CharaId);
    });
    SecretSocketComponent.mysock.on('Receive_all_chara_features', (data) => {
      this.charaservice.FeatureAll = data;
      console.log('received all chara features');
    });

    // ------------------------------------------------------------
    // ITEM LISTEN HOOKS
    // ------------------------------------------------------------


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

  }










  connectToSocket() {
    SecretSocketComponent.mysock = wsocket('http://localhost:3000');
    if (localStorage.getItem('user') != null) {
      SecretSocketComponent.joinUserRoom();
    }
  }














}
