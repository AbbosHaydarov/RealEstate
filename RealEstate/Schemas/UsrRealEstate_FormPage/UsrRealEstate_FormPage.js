define("UsrRealEstate_FormPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	const SALE_OFFER_TYPE_ID = "ea980034-b295-422f-8d1d-6fd08b446f29";
	const RENTAL_OFFER_TYPE_ID = "f92f2805-6e25-45c1-aee7-8b0794ccc699";

	async function calculateCommission(context) {
		const price = await context.PDS_UsrPrice_n00dr90;
		const offerType = await context.PDS_UsrOfferType_82xf8k8;
		if (typeof price !== "number" || !offerType) {
			context.PDS_UsrCommission_jlxb0zv = null;
			return;
		}
		const sysSettingsService = new sdk.SysSettingsService();
		let settingCode;
		const offerTypeId = (offerType.value || offerType).toString().toLowerCase();
		if (offerTypeId === SALE_OFFER_TYPE_ID) {
			settingCode = "ComissionValueForSaleOfferType";
		} else if (offerTypeId === RENTAL_OFFER_TYPE_ID) {
			settingCode = "ComissionValueForRentalOfferType";
		} else {
			context.PDS_UsrCommission_jlxb0zv = null;
			return;
		}
		const rateSetting = await sysSettingsService.getByCode(settingCode);
		const rate = rateSetting.value;
		context.PDS_UsrCommission_jlxb0zv = price * rate;
	}

	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "SideAreaProfileContainer",
				"values": {
					"columns": [
						"minmax(64px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
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
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "merge",
				"name": "CardToggleTabPanel",
				"values": {
					"styleType": "default",
					"bodyBackgroundColor": "primary-contrast-500",
					"selectedTabTitleColor": "auto",
					"tabTitleColor": "auto",
					"underlineSelectedTabColor": "auto",
					"headerBackgroundColor": "auto",
					"allowToggleClose": true
				}
			},
			{
				"operation": "merge",
				"name": "Feed",
				"values": {
					"dataSourceName": "PDS",
					"entitySchemaName": "UsrRealEstate"
				}
			},
			{
				"operation": "merge",
				"name": "AttachmentList",
				"values": {
					"columns": [
						{
							"id": "65ee1cff-2f1e-4cb2-8675-460ebc28d1e4",
							"code": "AttachmentListDS_Name",
							"caption": "#ResourceString(AttachmentListDS_Name)#",
							"dataValueType": 28,
							"width": 200
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "Button_dymgjj6",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_dymgjj6_caption)#",
					"color": "accent",
					"disabled": false,
					"size": "medium",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.PrintablesRequest",
						"params": {
							"dataSourceName": "PDS"
						}
					},
					"clickMode": "default"
				},
				"parentName": "CardToggleContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_Refresh",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_Refresh_caption)#",
					"color": "default",
					"disabled": false,
					"size": "medium",
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
									"PDS"
								]
							}
						}
					},
					"clickMode": "default",
					"icon": "reload-icon"
				},
				"parentName": "CardToggleContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrName",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrName",
					"control": "$UsrName",
					"labelPosition": "auto",
					"multiline": false
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_UsrCommission",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_UsrCommission_jlxb0zv",
					"control": "$PDS_UsrCommission_jlxb0zv",
					"readonly": true,
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": "",
					"visible": true
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NumberInput_UsrArea",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_UsrArea_43ol2ek",
					"control": "$PDS_UsrArea_43ol2ek",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": "",
					"visible": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_UsrType",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.PDS_UsrType_uscguf8",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$PDS_UsrType_uscguf8",
					"visible": true,
					"readonly": false,
					"placeholder": "",
					"valueDetails": null
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "addRecord_1xe43h3",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_1xe43h3_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_UsrType",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_UsrPrice",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.PDS_UsrPrice_n00dr90",
					"control": "$PDS_UsrPrice_n00dr90",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": "",
					"visible": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ComboBox_UsrOfferType",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.PDS_UsrOfferType_82xf8k8",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$PDS_UsrOfferType_82xf8k8",
					"visible": true,
					"readonly": false,
					"placeholder": "",
					"valueDetails": null
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "addRecord_h5spcsd",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_h5spcsd_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_UsrOfferType",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_Comment",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.PDS_UsrComment_zpi8z5a",
					"control": "$PDS_UsrComment_zpi8z5a",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above",
					"visible": true
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "TabContainer_uik2zxe",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_uik2zxe_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_p4s8k6m",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					}
				},
				"parentName": "TabContainer_uik2zxe",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_srejm0x",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_srejm0x_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch"
				},
				"parentName": "TabContainer_uik2zxe",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_hmjxx5x",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": [],
					"visible": true,
					"color": "transparent",
					"borderRadius": "none",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"alignItems": "stretch"
				},
				"parentName": "ExpansionPanel_srejm0x",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_l5suge3",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_hmjxx5x",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_f4vzr4l",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_f4vzr4l_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrRealEstateViewings"
						}
					}
				},
				"parentName": "FlexContainer_l5suge3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_bwiwyxv",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_bwiwyxv_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_ppemb6gDS"
						}
					}
				},
				"parentName": "FlexContainer_l5suge3",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_b0tp4f5",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_b0tp4f5_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_l5suge3",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_i6mifba",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_i6mifba_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_ppemb6g"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_b0tp4f5",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_d2ix90j",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_d2ix90j_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrRealEstateViewings"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_b0tp4f5",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_rnrhzgp",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_rnrhzgp_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_rnrhzgp_GridDetail_ppemb6g",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_ppemb6g"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_rnrhzgp_SearchValue",
							"GridDetailSearchFilter_rnrhzgp_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_l5suge3",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FlexContainer_buy7qo8",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"fitContent": true
				},
				"parentName": "GridContainer_hmjxx5x",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_wo663z7",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_wo663z7_caption)#",
					"color": "primary",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.RunBusinessProcessRequest",
						"params": {
							"processName": "UsrCreateViewingsForRealEstateViewing",
							"processRunType": "ForTheSelectedPage",
							"saveAtProcessStart": true,
							"recordIdProcessParameterName": "RecordId"
						}
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_buy7qo8",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_fi5fqu9",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_srejm0x",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_ppemb6g",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 13
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						},
						"editable": {
							"enable": false,
							"itemsCreation": false,
							"floatingEditPanel": false
						}
					},
					"items": "$GridDetail_ppemb6g",
					"primaryColumnName": "GridDetail_ppemb6gDS_Id",
					"columns": [
						{
							"id": "50b8513f-a34b-0967-72a2-9d65673b738a",
							"code": "GridDetail_ppemb6gDS_UsrOwner",
							"caption": "#ResourceString(GridDetail_ppemb6gDS_UsrOwner)#",
							"dataValueType": 27
						},
						{
							"id": "76df7b01-dc44-66c5-6683-a7fc349c508a",
							"code": "GridDetail_ppemb6gDS_UsrComment",
							"caption": "#ResourceString(GridDetail_ppemb6gDS_UsrComment)#",
							"dataValueType": 30
						},
						{
							"id": "c832c34c-857d-1801-7e86-47deb4ccbe75",
							"code": "GridDetail_ppemb6gDS_UsrPotentialClient",
							"caption": "#ResourceString(GridDetail_ppemb6gDS_UsrPotentialClient)#",
							"dataValueType": 28
						},
						{
							"id": "4a7f21a0-ebb2-6487-5c33-c41eab41344f",
							"code": "GridDetail_ppemb6gDS_UsrViewingDateTime",
							"caption": "#ResourceString(GridDetail_ppemb6gDS_UsrViewingDateTime)#",
							"dataValueType": 7
						},
						{
							"id": "4370fd06-9031-5262-eea8-7f681e965c5b",
							"code": "GridDetail_ppemb6gDS_CreatedOn",
							"caption": "#ResourceString(GridDetail_ppemb6gDS_CreatedOn)#",
							"dataValueType": 7
						},
						{
							"id": "18144234-b4cb-9e80-8a37-c6669de2a447",
							"code": "GridDetail_ppemb6gDS_CreatedBy",
							"caption": "#ResourceString(GridDetail_ppemb6gDS_CreatedBy)#",
							"dataValueType": 10
						}
					],
					"placeholder": false,
					"visible": true,
					"fitContent": true
				},
				"parentName": "GridContainer_fi5fqu9",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"UsrName": {
						"modelConfig": {
							"path": "PDS.UsrName"
						}
					},
					"PDS_UsrPrice_n00dr90": {
						"modelConfig": {
							"path": "PDS.UsrPrice"
						},
						"validators": {
							"ValidatePrice": {
								"type": "usr.PositiveNumberValidator",
								"params": {
									"message": ""
								}
							}
						}
					},
					"PDS_UsrArea_43ol2ek": {
						"modelConfig": {
							"path": "PDS.UsrArea"
						},
						"validators": {
							"ValidateArea": {
								"type": "usr.PositiveNumberValidator",
								"params": {
									"message": ""
								}
							}
						}
					},
					"PDS_UsrOfferType_82xf8k8": {
						"modelConfig": {
							"path": "PDS.UsrOfferType"
						}
					},
					"PDS_UsrOfferType_82xf8k8_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"PDS_UsrType_uscguf8": {
						"modelConfig": {
							"path": "PDS.UsrType"
						}
					},
					"PDS_UsrType_uscguf8_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"PDS_UsrCommission_jlxb0zv": {
						"modelConfig": {
							"path": "PDS.UsrCommission"
						}
					},
					"PDS_UsrComment_zpi8z5a": {
						"modelConfig": {
							"path": "PDS.UsrComment"
						},
						"validators": {
							"required": {
								"type": "crt.Required"
							}
						}
					},
					"GridDetail_ppemb6g": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_ppemb6gDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_rnrhzgp_GridDetail_ppemb6g",
									"loadOnChange": true
								},
								{
									"loadOnChange": true,
									"name": "GridDetail_ppemb6g_PredefinedFilter"
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_ppemb6gDS_UsrOwner": {
									"modelConfig": {
										"path": "GridDetail_ppemb6gDS.UsrOwner"
									}
								},
								"GridDetail_ppemb6gDS_UsrComment": {
									"modelConfig": {
										"path": "GridDetail_ppemb6gDS.UsrComment"
									}
								},
								"GridDetail_ppemb6gDS_UsrPotentialClient": {
									"modelConfig": {
										"path": "GridDetail_ppemb6gDS.UsrPotentialClient"
									}
								},
								"GridDetail_ppemb6gDS_UsrViewingDateTime": {
									"modelConfig": {
										"path": "GridDetail_ppemb6gDS.UsrViewingDateTime"
									}
								},
								"GridDetail_ppemb6gDS_CreatedOn": {
									"modelConfig": {
										"path": "GridDetail_ppemb6gDS.CreatedOn"
									}
								},
								"GridDetail_ppemb6gDS_CreatedBy": {
									"modelConfig": {
										"path": "GridDetail_ppemb6gDS.CreatedBy"
									}
								},
								"GridDetail_ppemb6gDS_Id": {
									"modelConfig": {
										"path": "GridDetail_ppemb6gDS.Id"
									}
								}
							}
						}
					},
					"GridDetail_ppemb6g_PredefinedFilter": {
						"value": null
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Id",
					"modelConfig"
				],
				"values": {
					"path": "PDS.Id"
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"primaryDataSourceName": "PDS",
					"dependencies": {
						"GridDetail_ppemb6gDS": [
							{
								"attributePath": "UsrRealEstate",
								"relationPath": "PDS.Id"
							}
						]
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"PDS": {
						"type": "crt.EntityDataSource",
						"config": {
							"entitySchemaName": "UsrRealEstate"
						},
						"scope": "page"
					},
					"GridDetail_ppemb6gDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrRealEstateViewings",
							"attributes": {
								"UsrOwner": {
									"path": "UsrOwner"
								},
								"UsrComment": {
									"path": "UsrComment"
								},
								"UsrPotentialClient": {
									"path": "UsrPotentialClient"
								},
								"UsrViewingDateTime": {
									"path": "UsrViewingDateTime"
								},
								"CreatedOn": {
									"path": "CreatedOn"
								},
								"CreatedBy": {
									"path": "CreatedBy"
								}
							}
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
		{
			request: "crt.LoadDataRequest",
			handler: async (request, next) => {
				const result = await next?.handle(request);
				const sysSettingsService = new sdk.SysSettingsService();
				const priceThresholdSetting = await sysSettingsService.getByCode("PriceForCommentRequiredCondition");
				const priceThreshold = priceThresholdSetting.value;
				const price = await request.$context.PDS_UsrPrice_n00dr90;
				if (typeof price === "number" && price > priceThreshold) {
					request.$context.enableAttributeValidator("PDS_UsrComment_zpi8z5a", "required");
				} else {
					request.$context.disableAttributeValidator("PDS_UsrComment_zpi8z5a", "required");
				}
				await calculateCommission(request.$context);
				return result;
			}
		},
		{
			request: "crt.HandleViewModelAttributeChangeRequest",
			handler: async (request, next) => {
				if (request.attributeName === "PDS_UsrPrice_n00dr90") {
					const sysSettingsService = new sdk.SysSettingsService();
					const priceThresholdSetting = await sysSettingsService.getByCode("PriceForCommentRequiredCondition");
					const priceThreshold = priceThresholdSetting.value;
					const price = await request.$context.PDS_UsrPrice_n00dr90;
					if (typeof price === "number" && price > priceThreshold) {
						request.$context.enableAttributeValidator("PDS_UsrComment_zpi8z5a", "required");
					} else {
						request.$context.disableAttributeValidator("PDS_UsrComment_zpi8z5a", "required");
					}
				}
				if (request.attributeName === "PDS_UsrPrice_n00dr90" ||
					request.attributeName === "PDS_UsrOfferType_82xf8k8") {
					await calculateCommission(request.$context);
				}
				return next?.handle(request);
			}
		},
	]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{
		"usr.PositiveNumberValidator": {
			"validator": function() {
				return function(control) {
					const value = control.value;
					if (value !== null && value !== undefined && typeof value === "number" && value < 0) {
						const messages = {
							"ru-RU": "Значение не может быть отрицательным",
							"en-US": "Value cannot be negative"
						};
						const culture = Terrasoft.currentUserCultureName;
						const message = messages[culture] || messages["en-US"];
						return {
							"usr.PositiveNumberValidator": {
								message: message
							}
						};
					}
					return null;
				};
			},
			"params": [
				{ "name": "message" }
			],
			"async": false
		}
	}/**SCHEMA_VALIDATORS*/
	};
});