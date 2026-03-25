import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  include MixinStorage();

  type PrydoIdRecord = {
    wallet : Text;
    tier : Text;
    avatarType : Text;
    timestamp : Int;
  };

  type PrydoIdWithPhoto = {
    idRecord : PrydoIdRecord;
    photo : ?Storage.ExternalBlob;
  };

  type MintOutput = {
    record : PrydoIdWithPhoto;
    idCount : Nat;
  };

  let prydos = Map.empty<Text, PrydoIdWithPhoto>();
  var currentIdCount = 0;

  func findPrydoId(wallet : Text) : PrydoIdWithPhoto {
    switch (prydos.get(wallet)) {
      case (null) { Runtime.trap("No PrydoId found") };
      case (?id) { id };
    };
  };

  public shared ({ caller }) func mintId(wallet : Text, tier : Text, avatarType : Text, photo : ?Storage.ExternalBlob) : async MintOutput {
    switch (prydos.get(wallet)) {
      case (null) {
        let newIdRecord : PrydoIdRecord = {
          wallet;
          tier;
          avatarType;
          timestamp = Time.now();
        };
        let newId : PrydoIdWithPhoto = {
          idRecord = newIdRecord;
          photo;
        };
        prydos.add(wallet, newId);
        currentIdCount += 1;
        {
          record = newId;
          idCount = currentIdCount;
        };
      };
      case (_) { Runtime.trap("Id already exists") };
    };
  };

  public shared ({ caller }) func uploadPhoto(wallet : Text, photo : Storage.ExternalBlob) : async PrydoIdWithPhoto {
    let id = findPrydoId(wallet);
    let updatedId = { id with photo = ?photo };
    prydos.add(wallet, updatedId);
    updatedId;
  };

  public query ({ caller }) func getIdByWallet(wallet : Text) : async PrydoIdWithPhoto {
    findPrydoId(wallet);
  };

  public query ({ caller }) func getAllMintedIds() : async [PrydoIdWithPhoto] {
    prydos.values().toArray();
  };

  public query ({ caller }) func getIdCount() : async Nat {
    currentIdCount;
  };
};
