module convictionfi::conviction_agent {

    use sui::object::{Self, UID, new, uid_to_address};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext, sender};
    use sui::balance;
    use 0x2::sui::SUI;

    /// Struct for the conviction NFT
    struct ConvictionNFT has key {
        id: UID,
        owner: address,
        strategy_name: vector<u8>,
        initial_cid: vector<u8>, // Immutable Walrus CID
        mutable_cid: vector<u8>, // Updatable Walrus CID
        wallet_id: address,
        created_at: u64,
    }

    /// Dummy Wallet object (can later be extended)
    struct AgentWallet has key {
        id: UID,
        balance: balance::Balance<SUI>,
    }

    /// Mint a new Conviction NFT with wallet
    public entry fun mint_conviction(
        strategy_name: vector<u8>,
        initial_cid: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft_id = new(ctx);
        let wallet_uid = new(ctx);
        let wallet = AgentWallet {
            id: wallet_uid,
            balance: balance::zero<SUI>(),
        };

        let nft = ConvictionNFT {
            id: nft_id,
            owner: sender(ctx),
            strategy_name,
            initial_cid,
            mutable_cid: initial_cid,
            wallet_id: uid_to_address(&wallet.id),
            created_at: 0, // No on-chain timestamp available
        };

        transfer::transfer(nft, sender(ctx));
        transfer::transfer(wallet, sender(ctx));
    }

    /// Update mutable metadata CID
    public entry fun update_metadata(
        nft: &mut ConvictionNFT,
        new_cid: vector<u8>,
        ctx: &TxContext
    ) {
        assert!(nft.owner == sender(ctx), 0);
        nft.mutable_cid = new_cid;
    }

    /// Transfer NFT to another address (optional)
    public entry fun transfer_nft(nft: ConvictionNFT, recipient: address) {
        transfer::transfer(nft, recipient);
    }
}
