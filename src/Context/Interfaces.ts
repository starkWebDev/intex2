
export interface ICampaign {
    id: number
    campaign_id: number
    category_id: number
    currency_code: string
    current_amount: string
    goal: string
    donators: number
    days_active: number
    title: string
    description: string
    user_first: string
    user_last: string
    campaign_image_url: string
    launch_date: Date
    has_beneficiary: boolean
    visible_in_search: boolean
    deactivated: boolean
    hearts: number
    social_share_total: number
    is_charity: boolean
    charity_valid: boolean
    charity_name: string
    update_count: number
    donations?: IDonation[]
    updates?: IUpdate[]
}

export interface IDonation {
    "donation_id": number,
    "campaign_id": number,
    "amount": string,
    "is_offline": boolean,
    "is_anonymous": boolean,
    "name": string,
    "created_at": Date, // turn into date object at some point
    "verified": boolean
}

export interface IUpdate {
    "update_id": number,
    "campaign_id": number,
    "created_at": Date,
    "photo_url": string,
    "update_author": string,
    "author_type": string,
    "update_text": string
}

export interface IData {
    day: number;
    runningTotal: number;
}

export interface ISocialSharesData {
    social?: number,
    donators?: number,
    social1?: number,
    donators1?: number,
}

export interface IInitial {
    rootURL: string
    campaigns: ICampaign[]
    isLoading: boolean
    selectedCampaign: ICampaign | null
    startCalcs: boolean
    donationsTimeData: IData[]
    socialSharesData: ISocialSharesData[]
    detailsLoading: boolean
    avgDonators: number
    stdevDonators: number
    avgUpdates: number
    stdevUpdates: number
    avgSocialShares: number
    stdevSocialShares: number
    avgCurrentRaisedPerDayActive: number
    avgPercentRaisedPerDayActive: number
    getCampaigns: () => void
    setSelectedCampaign: (idx: number) => Promise<void>
    getDonationsTimeData: () => void
    getSocialSharesData: () => void
    addSelectedToSocial: () => void
    removeSelectedFromSocial: () => void
    runMathFuncs: () => void
}


