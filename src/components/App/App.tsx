// @ts-ignore TODO: remove after TS release
import React, { useState } from 'react';
import './App.css';
import Apptree from '../Apptree/Apptree';

import { 
	ReactiveBase, ResultList, ReactiveList, SelectedFilters, DataSearch
} from '@appbaseio/reactivesearch';

// import nodes from '../../assests/familyData/sample.json';
// const myID = 'root';

import nodes from '../../assests/familyData/mePhoto.json';
const myID = 'mine';

const AppSearcher = () => {
	const [newNodes, setNodes] = useState(nodes);
	const [newID, setID] = useState(myID);
	const booksList = (data: any) => {
		return  <ResultList key={data._id}>
			<ResultList.Image src="https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg" />
			<ResultList.Content>
				<ResultList.Title
					dangerouslySetInnerHTML={{
						__html: (JSON.parse(data.relationships[0])["fname"] && JSON.parse(data.relationships[0])["fname"].length)? JSON.parse(data.relationships[0])["fname"] + ' ' + JSON.parse(data.relationships[0])["lname"]:'Nick Name'
					}}
				/>
				<ResultList.Description>
					<div className="flex column justify-space-between">
						{/* <div>Family_Code: <span className="authors-list">{data.family_code[0]}</span></div> */}
						{/* <div>ID: <span className="authors-list">{data._id}</span></div> */}
						{/* <div><span className="authors-list">{JSON.parse(data.relationships[0])["fname"] + ' ' + JSON.parse(data.relationships[0])["lname"]}</span></div> */}
						<div><span className="authors-list">{(JSON.parse(data.relationships[0])["birth"] && JSON.parse(data.relationships[0])["birth"].length)? JSON.parse(data.relationships[0])["birth"] + '/' + JSON.parse(data.relationships[0])["death"]:'birth/death'}</span></div>
						{/* <div><span className="authors-list">{JSON.parse(data.relationships[0])["death"]}</span></div> */}
						{/* <div>Images: <span className="authors-list">{JSON.parse(data.relationships[0])["images"]}</span></div> */}
					</div>
				</ResultList.Description>
			</ResultList.Content>
		</ResultList>
	};

	const onUpdate = (data: any) => {
		console.log("data: ", data);
		// return;
		let prenodes = makeNodes(data);		
		function makeNodes(data: any) {			
			let preData = data.data, lenData = preData.length;
			let prenodes = [], prenode, i;
			for (i = 0; i < lenData; i++){
				prenode = JSON.parse(preData[i]["relationships"][0]);
				prenode["family_code"] = preData[i]["family_code"];
				prenode["images"] = prenode["images"][0];
				prenodes.push(prenode);
				prenode=[];
			}			
			return prenodes;
		}
		let preid = prenodes[0]["id"];
		console.log("preid: ", typeof(preid), preid, "\nprenodes: ", prenodes);
		// return;
		if(prenodes[0]["family_code"] == "390822") {
			setNodes(prenodes);
			setID(preid);
			console.log("current ID and nodes: ", newID, newNodes);
		} else {
			setNodes(nodes);
			setID(myID);
			console.log("current ID and nodes: ", newID, newNodes);
		}		
	}

	return (
		<div className="root">
			<ReactiveBase
				app = 'elasticsearch_index_bitnami_drupal8_attendee'
				credentials = 'elastic:Uh44gjyJ78iGYMzMez0WJI7L'
				url = 'https://db170860be1944a39e20206e398f370c.eu-west-1.aws.found.io:9243'
			>
				<div className="row">
					<div className="col">
						<DataSearch
							className="dataSearch"
							dataField={["family_code"]}
							componentId="Family Code"
							placeholder="Family Code"
						/>
					</div>

					<label className="searchlabel">
						<input type="checkbox" />
						<div className="col" id="searchlist">
							<SelectedFilters />
							<ReactiveList
								componentId="SearchResult"
								dataField="family_code"
								// from={0}
								size={26}
								onData={onUpdate}
								className="result-list-container"
								renderItem={booksList}
								pagination={false}
								react={{
									and: ['Family Code'],
								}}
							/>
						</div>
					</label>					
					
				</div>
			</ReactiveBase>
			<Apptree 
				myID={newID}
				nodes={newNodes}
			/>
		</div>
	);
};

export default AppSearcher;
