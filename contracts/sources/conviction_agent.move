module convictionfi::conviction_agent {

    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::balance;
    use sui::coin;

    /// Struct for the conviction NFT
    struct ConvictionNFT has key {
        id: UID,
        owner: address,
        strategy_name: vector<u8>,
        initial_cid: vector<u8>, // Immutable Walrus CID
        mutable_cid: vector<u8>, // Updatable Walrus CID
        wallet_id: ID,
        created_at: u64,
    }

    /// Dummy Wallet object (can later be extended)
    struct AgentWallet has key {
        id: UID,
        balance: balance::Balance<coin::SUI>,
    }

    /// Mint a new Conviction NFT with wallet
    public fun mint_conviction(
        strategy_name: vector<u8>,
        initial_cid: vector<u8>,
        ctx: &mut TxContext
    ): (ConvictionNFT, AgentWallet) {
        let nft_id = object::new(ctx);
        let wallet_uid = object::new(ctx);
        let wallet = AgentWallet {
            id: wallet_uid,
            balance: balance::zero<coin::SUI>(),
        };

        let nft = ConvictionNFT {
            id: nft_id,
            owner: tx_context::sender(ctx),
            strategy_name,
            initial_cid,
            mutable_cid: initial_cid,
            wallet_id: object::uid_to_id(&wallet.id),
            created_at: tx_context::timestamp_ms(ctx),
        };

        (nft, wallet)
    }

    /// Update mutable metadata CID
    public fun update_metadata(
        nft: &mut ConvictionNFT,
        new_cid: vector<u8>,
        ctx: &TxContext
    ) {
        assert!(nft.owner == tx_context::sender(ctx), 0);
        nft.mutable_cid = new_cid;
    }

    /// Transfer NFT to another address (optional)
    public fun transfer_nft(nft: ConvictionNFT, recipient: address) {
        transfer::transfer(nft, recipient);
    }
}
