type Investors = {
    firm_id: number;
    firm_name: string;
    firm_type: string;
    date_added: Date;
    address: string;
}

type Commitment = {
    id: number;
    asset_class: string;
    firm_id: number;
    currency: string,
    amount: number;
}