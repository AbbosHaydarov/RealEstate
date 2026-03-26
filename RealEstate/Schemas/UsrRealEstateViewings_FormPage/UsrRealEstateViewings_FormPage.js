define("UsrRealEstateViewings_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "TopAreaProfileContainer",
				"values": {
					"columns": [
						"minmax(64px, 1fr)",
						"minmax(64px, 1fr)",
						"minmax(64px, 1fr)",
						"minmax(64px, 1fr)"
					],
					"visible": true,
					"alignItems": "stretch"
				}
			},
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"styleType": "default",
					"mode": "tab",
					"bodyBackgroundColor": "primary-contrast-500",
					"selectedTabTitleColor": "auto",
					"tabTitleColor": "auto",
					"underlineSelectedTabColor": "auto",
					"headerBackgroundColor": "auto",
					"allowToggleClose": true
				}
			},
			{
				"operation": "insert",
				"name": "RefreshButton",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(RefreshButton_caption)#",
					"color": "default",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-icon",
					"visible": true,
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"refreshDataConfig": {
								"mode": "RefreshAll",
								"excludedDataSourceNames": [
									"UsrRealEstateViewingsDS"
								]
							}
						}
					},
					"clickMode": "default",
					"icon": "reload-icon"
				},
				"parentName": "CardToggleContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRealEstate",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrRealEstateViewingsDS_UsrRealEstate_undumk4",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrRealEstateViewingsDS_UsrRealEstate_undumk4",
					"visible": true,
					"readonly": false,
					"placeholder": ""
				},
				"parentName": "TopAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "addRecord_2uzhupc",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_2uzhupc_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "UsrRealEstate",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrViewingDateTime",
				"values": {
					"layoutConfig": {
						"column": 3,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.DateTimePicker",
					"label": "$Resources.Strings.UsrRealEstateViewingsDS_UsrViewingDateTime_iui8511",
					"placeholder": "",
					"readonly": false,
					"labelPosition": "above",
					"tooltip": "",
					"pickerType": "datetime",
					"control": "$UsrRealEstateViewingsDS_UsrViewingDateTime_iui8511",
					"visible": true
				},
				"parentName": "TopAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CreatedOn",
				"values": {
					"layoutConfig": {
						"column": 4,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.DateTimePicker",
					"label": "$Resources.Strings.UsrRealEstateViewingsDS_CreatedOn_oxth6ft",
					"placeholder": "",
					"readonly": false,
					"labelPosition": "above",
					"tooltip": "",
					"pickerType": "datetime",
					"control": "$UsrRealEstateViewingsDS_CreatedOn_oxth6ft",
					"visible": true
				},
				"parentName": "TopAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrOwner",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrRealEstateViewingsDS_UsrOwner_kpyutud",
					"control": "$UsrRealEstateViewingsDS_UsrOwner_kpyutud",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above",
					"visible": true
				},
				"parentName": "GridContainer_uxln7d4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPotentialClient",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrRealEstateViewingsDS_UsrPotentialClient_ckj6b4j",
					"control": "$UsrRealEstateViewingsDS_UsrPotentialClient_ckj6b4j",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above",
					"visible": true
				},
				"parentName": "GridContainer_uxln7d4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrComment",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrRealEstateViewingsDS_UsrComment_4xf3ww3",
					"control": "$UsrRealEstateViewingsDS_UsrComment_4xf3ww3",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above",
					"visible": true
				},
				"parentName": "GridContainer_uxln7d4",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"UsrRealEstateViewingsDS_UsrViewingDateTime_iui8511": {
						"modelConfig": {
							"path": "UsrRealEstateViewingsDS.UsrViewingDateTime"
						}
					},
					"UsrRealEstateViewingsDS_UsrRealEstate_undumk4": {
						"modelConfig": {
							"path": "UsrRealEstateViewingsDS.UsrRealEstate"
						}
					},
					"UsrRealEstateViewingsDS_UsrRealEstate_undumk4_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrName",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrRealEstateViewingsDS_CreatedOn_oxth6ft": {
						"modelConfig": {
							"path": "UsrRealEstateViewingsDS.CreatedOn"
						}
					},
					"UsrRealEstateViewingsDS_UsrPotentialClient_ckj6b4j": {
						"modelConfig": {
							"path": "UsrRealEstateViewingsDS.UsrPotentialClient"
						}
					},
					"UsrRealEstateViewingsDS_UsrOwner_kpyutud": {
						"modelConfig": {
							"path": "UsrRealEstateViewingsDS.UsrOwner"
						}
					},
					"UsrRealEstateViewingsDS_UsrComment_4xf3ww3": {
						"modelConfig": {
							"path": "UsrRealEstateViewingsDS.UsrComment"
						}
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"dataSources": {
						"UsrRealEstateViewingsDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrRealEstateViewings",
								"loadParameters": {
									"options": {
										"pagingConfig": {
											"rowCount": 1,
											"rowsOffset": -1
										},
										"sortingConfig": {
											"columns": []
										}
									}
								},
								"allowCopyingRecords": false
							}
						}
					},
					"primaryDataSourceName": "UsrRealEstateViewingsDS"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});