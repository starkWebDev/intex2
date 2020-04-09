import React, { Component } from "react";
import { IInitial, ICampaign, IData, ISocialSharesData } from "./Interfaces";
import axios from "axios";
import produce from "immer";
import _ from "lodash";
import { MathFuncs } from "../utils/MathFuncs";

const initialContext: IInitial = {
	rootURL: "",
	campaigns: [],
	isLoading: false,
	selectedCampaign: null,
	startCalcs: false,
	donationsTimeData: [],
	socialSharesData: [],
	detailsLoading: false,
	avgDonators: 0,
	stdevDonators: 0,
	avgUpdates: 0,
	stdevUpdates: 0,
	avgSocialShares: 0,
	stdevSocialShares: 0,
	avgCurrentRaisedPerDayActive: 0,
	avgPercentRaisedPerDayActive: 0,
	getCampaigns: () => {},
	setSelectedCampaign: (idx: number) => new Promise<void>(() => {}),
	getDonationsTimeData: () => {},
	getSocialSharesData: () => {},
	addSelectedToSocial: () => {},
	removeSelectedFromSocial: () => {},
	runMathFuncs: () => {},
};

export const MainContext = React.createContext(initialContext);

export class MainProvider extends Component {
	async componentDidMount() {
		await this.getCampaigns();
		this.getSocialSharesData();
		this.runMathFuncs();
	}
	getCampaigns = async () => {
		this.setState(
			produce((draft) => {
				draft.isLoading = true;
			})
		);
		try {
			const res = await axios.get(`${this.state.rootURL}campaign/`);
			this.setState(
				produce((draft) => {
					draft.campaigns = res.data.map((o: ICampaign) => ({
						...o,
						launch_date: new Date(o.launch_date),
					}));
					draft.isLoading = false;
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	setSelectedCampaign = async (idx: number) => {
		this.setState(
			produce((draft) => {
				draft.detailsLoading = true;
				draft.selectedCampaign = this.state.campaigns[idx];
			})
		);
		//this.state.selectedCampaign?.campaign_id
		try {
			const updatesRes = await axios.get(
				`${this.state.rootURL}updateFilter/${this.state.campaigns[idx].id}/`
			);
			const donationsRes = await axios.get(
				`${this.state.rootURL}donationFilter/${this.state.campaigns[idx].id}/`
			);
			this.setState(
				produce((draft) => {
					if (draft.selectedCampaign) {
						updatesRes &&
							(draft.selectedCampaign.updates = updatesRes.data.map(
								(update: any) => ({
									...update,
									created_at: new Date(update.created_at),
								})
							));
						donationsRes &&
							(draft.selectedCampaign.donations = donationsRes.data.map(
								(don: any) => ({
									...don,
									created_at: new Date(don.created_at),
								})
							));
					}
				})
			);
			this.getDonationsTimeData();
			this.addSelectedToSocial();
			this.setState(
				produce((draft) => {
					draft.detailsLoading = false;
				})
			);
		} catch (err) {
			throw new Error(err);
		}
	};

	getDonationsTimeData = () => {
		if (
			this.state.selectedCampaign &&
			this.state.selectedCampaign.donations &&
			this.state.selectedCampaign.donations.length > 1
		) {
			let { donations } = this.state.selectedCampaign;
			const copy = donations.map((don) => ({ ...don }));
			const sorted = copy.sort(
				(a, b) => a.created_at.valueOf() - b.created_at.valueOf()
			);
			const totalDays = toDays(
				sorted[sorted.length - 1].created_at.valueOf() -
					sorted[0].created_at.valueOf()
			);
			const initialDate = sorted[0].created_at;
			let _data: any = {};
			for (let index = 0; index <= totalDays; index++) {
				_data[index] = 0;
			}
			sorted.forEach((donation, idx) => {
				const dif = toDays(
					donation.created_at.valueOf() - initialDate.valueOf()
				);
				// if (idx === 0) {
				// 	_data[dif] = Number(donation.amount);
				// } else {
				_data[dif] += Number(donation.amount);
				// }
			});

			let finalData: IData[] = [];
			Object.entries(_data).forEach(([day, amt], idx) => {
				if (idx !== 0) {
					finalData.push({
						day: Number(day),
						runningTotal: amt + _data[idx - 1],
					});
					_data[idx] += _data[idx - 1];
				} else {
					finalData.push({
						day: Number(day),
						runningTotal: Number(amt),
					});
				}
			});
			this.setState(
				produce((draft) => {
					draft.donationsTimeData = finalData;
				})
			);
		}
	};

	getSocialSharesData = () => {
		let sample = (_.sampleSize(
			this.state.campaigns,
			1000
		) as unknown) as ICampaign[];
		let copy = sample
			.map((cam) => ({ ...cam }))
			.filter(
				(camp) =>
					camp.donators < 4000 && camp.social_share_total < 10000
			);
		const data: ISocialSharesData[] = copy.map((camp) => {
			return {
				social: camp.social_share_total,
				donators: camp.donators,
			};
		});
		this.setState(
			produce((draft) => {
				draft.socialSharesData = data;
			})
		);
	};

	addSelectedToSocial = () => {
		if (this.state.selectedCampaign) {
			this.setState(
				produce((draft) => {
					draft.socialSharesData.push({
						social1: this.state.selectedCampaign
							?.social_share_total,
						donators1: this.state.selectedCampaign?.donators,
					});
				})
			);
		}
	};

	removeSelectedFromSocial = () => {
		this.setState(
			produce((draft) => {
				draft.socialSharesData.pop();
			})
		);
	};

	runMathFuncs = () => {
		const mathFuncs = new MathFuncs();
		const { campaigns } = this.state;
		const avgDonators = mathFuncs.Avg(
			campaigns.map(({ donators }) => donators)
		);
		const stdevDonators = mathFuncs.StandardDeviation(
			campaigns.map(({ donators }) => donators)
		);
		const avgUpdates = mathFuncs.Avg(
			campaigns.map(({ update_count }) => update_count)
		);
		const stdevUpdates = mathFuncs.StandardDeviation(
			campaigns.map(({ update_count }) => update_count)
		);
		const avgSocialShares = mathFuncs.Avg(
			campaigns.map(({ social_share_total }) => social_share_total)
		);
		const stdevSocialShares = mathFuncs.StandardDeviation(
			campaigns.map(({ social_share_total }) => social_share_total)
		);
		const avgCurrentRaisedPerDayActive = mathFuncs.Avg(
			campaigns
				.filter(({ days_active }) => days_active > 0)
				.map(
					({ current_amount, days_active }, idx) =>
						Number(current_amount) / days_active
				)
		);
		const avgPercentRaisedPerDayActive = mathFuncs.Avg(
			campaigns
				.filter(({ days_active }) => days_active > 0)
				.map(
					({ current_amount, goal, days_active }) =>
						Number(current_amount) / Number(goal) / days_active
				)
		);

		this.setState(
			produce((draft) => {
				draft.avgDonators = avgDonators;
				draft.stdevDonators = stdevDonators;
				draft.avgUpdates = avgUpdates;
				draft.stdevUpdates = stdevUpdates;
				draft.avgSocialShares = avgSocialShares;
				draft.stdevSocialShares = stdevSocialShares;
				draft.avgCurrentRaisedPerDayActive = avgCurrentRaisedPerDayActive;
				draft.avgPercentRaisedPerDayActive = avgPercentRaisedPerDayActive;
			})
		);
	};

	state: IInitial = {
		rootURL:
			"http://ec2-13-59-34-252.us-east-2.compute.amazonaws.com:8000/api/",
		campaigns: [],
		isLoading: false,
		selectedCampaign: null,
		startCalcs: false,
		donationsTimeData: [],
		socialSharesData: [],
		detailsLoading: false,
		avgDonators: 0,
		stdevDonators: 0,
		avgUpdates: 0,
		stdevUpdates: 0,
		avgSocialShares: 0,
		stdevSocialShares: 0,
		avgCurrentRaisedPerDayActive: 0,
		avgPercentRaisedPerDayActive: 0,
		getCampaigns: this.getCampaigns,
		setSelectedCampaign: this.setSelectedCampaign,
		getDonationsTimeData: this.getDonationsTimeData,
		getSocialSharesData: this.getSocialSharesData,
		addSelectedToSocial: this.addSelectedToSocial,
		removeSelectedFromSocial: this.removeSelectedFromSocial,
		runMathFuncs: this.runMathFuncs,
	};

	render() {
		return (
			<MainContext.Provider value={this.state}>
				{this.props.children}
			</MainContext.Provider>
		);
	}
}

const toDays = (ms: number) => Math.round(ms / (1000 * 60 * 60 * 24));
