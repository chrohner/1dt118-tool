(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`{
  "type": "bundle",
  "id": "bundle--87e691cd-3e6b-5ecf-ac2e-7b961b08c83f",
  "objects": [
    {
      "type": "extension-definition",
      "id": "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4",
      "spec_version": "2.1",
      "name": "Attack Flow",
      "description": "Extends STIX 2.1 with features to create Attack Flows.",
      "created": "2022-08-02T19:34:35.143Z",
      "modified": "2022-08-02T19:34:35.143Z",
      "created_by_ref": "identity--d673f8cb-c168-42da-8ed4-0cb26725f86c",
      "schema": "https://center-for-threat-informed-defense.github.io/attack-flow/stix/attack-flow-schema-2.0.0.json",
      "version": "2.0.0",
      "extension_types": [
        "new-sdo"
      ],
      "external_references": [
        {
          "source_name": "Documentation",
          "description": "Documentation for Attack Flow",
          "url": "https://center-for-threat-informed-defense.github.io/attack-flow"
        },
        {
          "source_name": "GitHub",
          "description": "Source code repository for Attack Flow",
          "url": "https://github.com/center-for-threat-informed-defense/attack-flow"
        }
      ]
    },
    {
      "type": "identity",
      "spec_version": "2.1",
      "id": "identity--d673f8cb-c168-42da-8ed4-0cb26725f86c",
      "created_by_ref": "identity--d673f8cb-c168-42da-8ed4-0cb26725f86c",
      "created": "2022-08-02T19:34:35.143Z",
      "modified": "2022-08-02T19:34:35.143Z",
      "name": "MITRE Center for Threat-Informed Defense",
      "identity_class": "organization"
    },
    {
      "type": "identity",
      "spec_version": "2.1",
      "id": "identity--915e3412-5ddb-504a-9437-438df9c87154",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "name": "1DT118 synthetic teaching example",
      "identity_class": "group"
    },
    {
      "type": "attack-flow",
      "spec_version": "2.1",
      "id": "attack-flow--adc59eb2-fde4-55f7-8081-79d35724576b",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "portal-flow"
        }
      ],
      "name": "M1a portal pilot",
      "description": "Synthetic prospective model; positive monotone semantics supplied by the course evaluator.",
      "scope": "other",
      "created_by_ref": "identity--915e3412-5ddb-504a-9437-438df9c87154",
      "start_refs": [
        "attack-condition--10683961-2570-5885-be41-6f2e072e2d7d",
        "attack-condition--afe2d989-eadd-59fd-bdf6-21a265d8db11",
        "attack-condition--b4020ad5-653b-5a68-898f-ea02a97b24c9",
        "attack-condition--413afb32-b5fe-5b62-bfe3-dda65e2d9b54",
        "attack-condition--dc1a174b-973f-514d-af1a-d347789cf6ca",
        "attack-condition--a28c27b7-f4cf-5215-ab8b-8e2809b49ee7",
        "attack-condition--ab05252d-870b-5c8d-9b72-49a98318b226",
        "attack-condition--22dc74a2-ae89-5478-ad05-a6053444ea88",
        "attack-condition--3683c5ca-a253-5698-8e40-cba901ed22ac"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--ab05252d-870b-5c8d-9b72-49a98318b226",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "authorised"
        }
      ],
      "description": "authorised",
      "on_true_refs": [
        "attack-operator--dfe52b36-6785-58c0-a7e1-cf62f5e3d67a"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--f6d508f5-8df4-5393-9862-64c9fc328480",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "credential"
        }
      ],
      "description": "credential",
      "on_true_refs": [
        "attack-operator--719eca72-3146-59ed-b19c-d94bf019d271"
      ]
    },
    {
      "type": "attack-operator",
      "spec_version": "2.1",
      "id": "attack-operator--d2bdb27c-efca-5369-98c4-d07b951c00d4",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "derive_credential"
        }
      ],
      "operator": "OR",
      "effect_refs": [
        "attack-condition--f6d508f5-8df4-5393-9862-64c9fc328480"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--3683c5ca-a253-5698-8e40-cba901ed22ac",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "db_reads_target"
        }
      ],
      "description": "db_reads_target",
      "on_true_refs": [
        "attack-operator--3137699e-c9a7-5d8e-b94a-d5b6b449d5b5"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--e0ced394-2244-595d-a8e8-5698428653f2",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "goal"
        }
      ],
      "description": "goal"
    },
    {
      "type": "attack-operator",
      "spec_version": "2.1",
      "id": "attack-operator--78168bc8-0c43-50e5-b454-b0b8f6986463",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "derive_goal"
        }
      ],
      "operator": "OR",
      "effect_refs": [
        "attack-condition--e0ced394-2244-595d-a8e8-5698428653f2"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--b4020ad5-653b-5a68-898f-ea02a97b24c9",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "helpdesk_reachable"
        }
      ],
      "description": "helpdesk_reachable",
      "on_true_refs": [
        "attack-operator--3a0f4533-fb00-5d48-9a95-8234a44fe338"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--a28c27b7-f4cf-5215-ab8b-8e2809b49ee7",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "login_allowed"
        }
      ],
      "description": "login_allowed",
      "on_true_refs": [
        "attack-operator--719eca72-3146-59ed-b19c-d94bf019d271"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--413afb32-b5fe-5b62-bfe3-dda65e2d9b54",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "phishing_feasible"
        }
      ],
      "description": "phishing_feasible",
      "on_true_refs": [
        "attack-operator--7d79cc02-2168-5c14-8187-8b0ad3caade5"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--10683961-2570-5885-be41-6f2e072e2d7d",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "portal_reachable"
        }
      ],
      "description": "portal_reachable",
      "on_true_refs": [
        "attack-operator--719eca72-3146-59ed-b19c-d94bf019d271",
        "attack-operator--3137699e-c9a7-5d8e-b94a-d5b6b449d5b5"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--dc1a174b-973f-514d-af1a-d347789cf6ca",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "reset_feasible"
        }
      ],
      "description": "reset_feasible",
      "on_true_refs": [
        "attack-operator--3a0f4533-fb00-5d48-9a95-8234a44fe338"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--ccc60b8f-c2cb-5501-a716-1a2f3b1bc5f5",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "session"
        }
      ],
      "description": "session",
      "on_true_refs": [
        "attack-operator--dfe52b36-6785-58c0-a7e1-cf62f5e3d67a"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--22dc74a2-ae89-5478-ad05-a6053444ea88",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "sqli_feasible"
        }
      ],
      "description": "sqli_feasible",
      "on_true_refs": [
        "attack-operator--3137699e-c9a7-5d8e-b94a-d5b6b449d5b5"
      ]
    },
    {
      "type": "attack-condition",
      "spec_version": "2.1",
      "id": "attack-condition--afe2d989-eadd-59fd-bdf6-21a265d8db11",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "x_contactable"
        }
      ],
      "description": "x_contactable",
      "on_true_refs": [
        "attack-operator--7d79cc02-2168-5c14-8187-8b0ad3caade5"
      ]
    },
    {
      "type": "attack-operator",
      "spec_version": "2.1",
      "id": "attack-operator--7d79cc02-2168-5c14-8187-8b0ad3caade5",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "pre_phish"
        }
      ],
      "operator": "AND",
      "effect_refs": [
        "attack-action--20a7ffcb-80d3-5b64-9dc1-fe39d3889837"
      ]
    },
    {
      "type": "attack-action",
      "spec_version": "2.1",
      "id": "attack-action--20a7ffcb-80d3-5b64-9dc1-fe39d3889837",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "phish"
        }
      ],
      "name": "phish",
      "description": "Effort: 3 reference-adversary hours. Illustrative assumption.",
      "effect_refs": [
        "attack-operator--d2bdb27c-efca-5369-98c4-d07b951c00d4"
      ]
    },
    {
      "type": "attack-operator",
      "spec_version": "2.1",
      "id": "attack-operator--3a0f4533-fb00-5d48-9a95-8234a44fe338",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "pre_reset"
        }
      ],
      "operator": "AND",
      "effect_refs": [
        "attack-action--2a580095-ee70-546e-adea-52bf26ed7304"
      ]
    },
    {
      "type": "attack-action",
      "spec_version": "2.1",
      "id": "attack-action--2a580095-ee70-546e-adea-52bf26ed7304",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "reset"
        }
      ],
      "name": "reset",
      "description": "Effort: 1 reference-adversary hours. Illustrative assumption.",
      "effect_refs": [
        "attack-operator--d2bdb27c-efca-5369-98c4-d07b951c00d4"
      ]
    },
    {
      "type": "attack-operator",
      "spec_version": "2.1",
      "id": "attack-operator--719eca72-3146-59ed-b19c-d94bf019d271",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "pre_login"
        }
      ],
      "operator": "AND",
      "effect_refs": [
        "attack-action--0211c747-8ab9-58cf-8510-7a139ebb3f14"
      ]
    },
    {
      "type": "attack-action",
      "spec_version": "2.1",
      "id": "attack-action--0211c747-8ab9-58cf-8510-7a139ebb3f14",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "login"
        }
      ],
      "name": "login",
      "description": "Effort: 1 reference-adversary hours. Illustrative assumption.",
      "effect_refs": [
        "attack-condition--ccc60b8f-c2cb-5501-a716-1a2f3b1bc5f5"
      ]
    },
    {
      "type": "attack-operator",
      "spec_version": "2.1",
      "id": "attack-operator--dfe52b36-6785-58c0-a7e1-cf62f5e3d67a",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "pre_read"
        }
      ],
      "operator": "AND",
      "effect_refs": [
        "attack-action--d0e42765-d2af-5bcb-9754-c0c6baa3d8d4"
      ]
    },
    {
      "type": "attack-action",
      "spec_version": "2.1",
      "id": "attack-action--d0e42765-d2af-5bcb-9754-c0c6baa3d8d4",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "read"
        }
      ],
      "name": "read",
      "description": "Effort: 0 reference-adversary hours. Illustrative assumption.",
      "effect_refs": [
        "attack-operator--78168bc8-0c43-50e5-b454-b0b8f6986463"
      ]
    },
    {
      "type": "attack-operator",
      "spec_version": "2.1",
      "id": "attack-operator--3137699e-c9a7-5d8e-b94a-d5b6b449d5b5",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "pre_inject"
        }
      ],
      "operator": "AND",
      "effect_refs": [
        "attack-action--e99a999e-a539-5323-ba27-bf506bde6a1f"
      ]
    },
    {
      "type": "attack-action",
      "spec_version": "2.1",
      "id": "attack-action--e99a999e-a539-5323-ba27-bf506bde6a1f",
      "created": "2026-11-09T12:00:00.000Z",
      "modified": "2026-11-09T12:00:00.000Z",
      "extensions": {
        "extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4": {
          "extension_type": "new-sdo"
        }
      },
      "external_references": [
        {
          "source_name": "1DT118-M1a",
          "external_id": "inject"
        }
      ],
      "name": "inject",
      "description": "Effort: 6 reference-adversary hours. Illustrative assumption.",
      "effect_refs": [
        "attack-operator--78168bc8-0c43-50e5-b454-b0b8f6986463"
      ]
    }
  ]
}
`,t=`{
  "units": "reference-adversary hours",
  "basis": "Illustrative teaching assumptions; not measured values",
  "initial_keys": [
    "portal_reachable",
    "x_contactable",
    "helpdesk_reachable",
    "phishing_feasible",
    "reset_feasible",
    "login_allowed",
    "authorised",
    "sqli_feasible",
    "db_reads_target"
  ],
  "goal_key": "goal",
  "effort_by_key": {
    "phish": 3,
    "reset": 1,
    "login": 1,
    "read": 0,
    "inject": 6
  },
  "variants": {
    "baseline": {
      "effort_overrides": {},
      "remove_initial": [],
      "expected_effort": 2
    },
    "verification": {
      "effort_overrides": {
        "reset": 8
      },
      "remove_initial": [],
      "expected_effort": 4
    },
    "mfa": {
      "effort_overrides": {},
      "remove_initial": [
        "login_allowed"
      ],
      "expected_effort": 6
    },
    "patch": {
      "effort_overrides": {},
      "remove_initial": [
        "sqli_feasible"
      ],
      "expected_effort": 2
    },
    "mfa_patch": {
      "effort_overrides": {},
      "remove_initial": [
        "login_allowed",
        "sqli_feasible"
      ],
      "expected_effort": null
    },
    "no_network": {
      "effort_overrides": {},
      "remove_initial": [
        "portal_reachable"
      ],
      "expected_effort": null
    },
    "no_phishing": {
      "effort_overrides": {},
      "remove_initial": [
        "phishing_feasible"
      ],
      "expected_effort": 2
    },
    "no_reset": {
      "effort_overrides": {},
      "remove_initial": [
        "reset_feasible"
      ],
      "expected_effort": 4
    },
    "no_credentials": {
      "effort_overrides": {},
      "remove_initial": [
        "phishing_feasible",
        "reset_feasible"
      ],
      "expected_effort": 6
    }
  }
}
`;function n(e,t){let n=new Map(t.initialFacts.map(e=>[e,0]));for(let e of t.entryActions)t.disabled.includes(e)||n.set(e,1);let r=!0;for(;r;){r=!1;for(let i of e.nodes){if(!i.incoming.length||i.kind===`action`&&t.disabled.includes(i.id))continue;let e=i.incoming.map(e=>n.get(e)??1/0),a=i.kind===`operator`?i.operator:t.joins?.[i.id];if(e.length>1&&!a)continue;let o=(a===`AND`?Math.max(...e):Math.min(...e))+1;Number.isFinite(o)&&o<(n.get(i.id)??1/0)&&(n.set(i.id,o),r=!0)}}return n}function r(e,t){t.initialFacts=e.nodes.filter(t=>t.kind===`condition`&&(!t.incoming.length||e.starts.includes(t.id))).map(e=>e.id),t.entryActions=e.nodes.filter(e=>e.kind===`action`&&!e.incoming.length).map(e=>e.id),t.joins??={};for(let n of e.nodes)n.kind!==`operator`&&n.incoming.length>1&&(t.joins[n.id]??=`OR`),n.kind===`action`&&(t.efforts[n.id]===void 0||t.efforts[n.id]===``)&&(t.efforts[n.id]=`1`,t.notes[n.id]=`Automatic illustrative default: 1 reference-adversary hour; not incident evidence.`);let r=n(e,t),i=e.nodes.filter(e=>e.kind!==`operator`&&r.has(e.id));i.sort((e,t)=>r.get(t.id)-r.get(e.id)||Number(!t.outgoing.length)-Number(!e.outgoing.length)||Number(t.kind===`condition`)-Number(e.kind===`condition`)||e.label.localeCompare(t.label)||e.id.localeCompare(t.id)),t.goal=i[0]?.id??``,t.automatic=!!t.goal&&!e.diagnostics.some(e=>e.level===`error`),t.assumptions=`Automatic exploratory setup: root conditions and declared starting conditions are initially true; root actions are allowed as entries (not already completed). Unlabelled multiple incoming edges default to OR; explicit source AND/OR operators are unchanged. Missing efforts default to 1 reference-adversary hour. These are editable teaching assumptions, not incident-derived measurements. The goal is the reachable action or fact with greatest minimum dependency depth from the initial nodes (one per execution edge; initial facts at 0, entry action completions at 1). Ties prefer terminal nodes, then facts, then label and ID. Unsupported constructs remain blocked; no internal cycle is seeded to force a goal.`,t.goal||(t.assumptions+=` No reachable action or fact was found; supply a justified initial condition or revise the source.`)}var i=`0.5.1`,a=`m1a-positive-1`,o=`m1a-static-opportunity-1`,s={semantics:[`Conditions are persistent Boolean facts; there are no delete effects or negation.`,`AND requires all incoming inputs; OR requires at least one. Unlabelled joins use the per-scenario AND/OR choice.`,`An action is enabled when its inputs hold (or it is an approved entry action); executing it assumes success.`,`Each action executes at most once; efforts are nonnegative, additive, and shared actions are charged once.`,`Minimum effort is an exact search over closed active sets; limits yield an incomplete result, never a minimum or unreachability.`],importDefaults:[`New imports: root and declared starting conditions true; root actions allowed as entries.`,`New imports: unlabelled joins default to OR; missing efforts default to 1; goal = reachable node of greatest minimum dependency depth.`],limits:[`2 MiB flow JSON`,`500 STIX objects`,`200 executable nodes`,`50 scenarios`,`50,000 search states`,`5 seconds per analysis`],metf:`m1a-metf-tm-1: each effort value is the mean of an exponentially distributed effort; in each state all enabled actions that add a new fact are attempted concurrently and the first success decides the next state (total-memory attacker, Ortalo et al. 1999); METF = expected effort to the first goal state; zero-effort actions succeed first; never combined with probabilities.`,probability:`m1a-static-opportunity-1: each action with probability p is attempted once when enabled and succeeds independently; initial facts with a prior hold independently; AND/OR deterministic; evidence conditions the final closure; never combined with effort.`};async function c(e=`reference hours`,t=!1,n=!1){let r={profile:a,engineVersion:i,semantics:s.semantics,importDefaults:s.importDefaults,unit:e,limits:s.limits,...t?{probabilitySemantics:s.probability}:{},...n?{metfSemantics:s.metf}:{}};return{...r,sha256:await ee(JSON.stringify(r))}}async function l(e){if(!u(e)||typeof e.sha256!=`string`||typeof e.profile!=`string`)throw Error(`Invalid analysis-rules description.`);let{sha256:t,...n}=e;if(await ee(JSON.stringify(n))!==t)throw Error(`The analysis-rules description in this project was altered; it no longer matches its digest.`);if(e.profile!==`m1a-positive-1`)throw Error(`This project was made with analysis rules ${e.profile}; this tool implements ${a}.`)}var u=e=>!!e&&typeof e==`object`&&!Array.isArray(e);function d(e){if(new TextEncoder().encode(e).length>2097152)throw Error(`File exceeds the 2 MiB import limit.`);let t=JSON.parse(e);if(!u(t)||t.type!==`bundle`||!Array.isArray(t.objects))throw Error(`Expected an Attack Flow STIX bundle with an objects array. Native .afb files are not supported; use File → Export STIX File in the Builder.`);if(t.objects.length>500)throw Error(`File exceeds the 500-object preview limit.`);let n=[],r=(e,t,r,i)=>n.push({level:e,code:t,message:r,nodeId:i}),i=new Map;for(let e of t.objects){if(!u(e)||typeof e.id!=`string`||typeof e.type!=`string`)throw Error(`Each STIX object must have a string ID and type.`);if(!e.id.startsWith(e.type+`--`)||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.id.slice(e.type.length+2)))throw Error(`Malformed STIX object ID: ${e.id.slice(0,160)}`);if(i.has(e.id))throw Error(`Duplicate object ID: ${e.id}`);i.set(e.id,e)}let a=[...i.values()].filter(e=>e.type===`attack-flow`);a.length!==1&&r(`error`,`flow-count`,`Exactly one attack-flow object is required.`);let o=(e,t)=>{let n=e[t];return n===void 0?[]:!Array.isArray(n)||n.some(e=>typeof e!=`string`)?(r(`error`,`references`,`${t} must be an array of IDs.`,String(e.id)),[]):[...new Set(n)]},s=[],c=i.get(`extension-definition--fb9c968a-745b-4ade-9b25-c324172197f4`);c&&c.version===`2.0.0`||r(`error`,`extension-version`,`The course profile requires the Attack Flow extension definition version 2.0.0.`);for(let e of i.values()){let t=e.type===`attack-action`?`action`:e.type===`attack-condition`?`condition`:e.type===`attack-operator`?`operator`:null;if(!t){![`attack-flow`,`attack-asset`].includes(String(e.type))&&(e.effect_refs||e.on_true_refs||e.on_false_refs)&&r(`error`,`unknown-execution`,`Unsupported executable object type ${e.type}.`,String(e.id));continue}let n=String(e.id);e.spec_version!==`2.1`&&r(`error`,`stix-version`,`Executable objects must use STIX 2.1.`,n),o(e,`on_false_refs`).length&&r(`error`,`failure-branch`,`Failure branches need richer semantics and cannot be executed in this prototype.`,n),t===`condition`&&(e.pattern||o(e,`effect_refs`).length)&&r(`error`,`condition-pattern`,`Executable patterns or condition effect_refs are outside the positive course profile.`,n),t!==`condition`&&o(e,`on_true_refs`).length&&r(`error`,`edge-kind`,`on_true_refs is supported only on conditions.`,n),t===`operator`&&e.operator!==`AND`&&e.operator!==`OR`&&r(`error`,`operator`,`Only AND and OR operators are supported.`,n),[`preconditions`,`delete_effects`,`negated`,`repeat`].some(t=>e[t]!==void 0)&&r(`error`,`unknown-semantics`,`Unrecognised execution semantics must be reviewed before analysis.`,n);let i=t===`operator`?String(e.operator):t===`action`?e.name:e.description;typeof i==`string`&&i.trim()||r(`error`,`label`,`An action name or condition description is required.`,n),s.push({id:n,kind:t,label:typeof i==`string`?i.slice(0,4e3):n,description:typeof e.description==`string`?e.description:``,...t===`operator`?{operator:e.operator}:{},incoming:[],outgoing:o(e,t===`condition`?`on_true_refs`:`effect_refs`)})}if(s.length>200)throw Error(`File exceeds the 200 executable-node limit.`);s.some(e=>e.kind===`condition`)||r(`info`,`action-goal`,`This flow has no condition nodes. Choose successful completion of an action as the goal in Setup.`);let l=new Map(s.map(e=>[e.id,e]));for(let e of s)for(let t of e.outgoing){let n=l.get(t);n?n.incoming.push(e.id):r(`error`,`dangling-edge`,`Execution target is missing or not executable: ${t}`,e.id)}for(let e of s)e.kind!==`operator`&&e.incoming.length>1&&r(`review`,`implicit-join`,`Choose AND (all incoming inputs) or OR (any incoming input) in Setup. This is a scenario assumption; the source is preserved.`,e.id),e.kind===`operator`&&!e.incoming.length&&r(`error`,`empty-operator`,`An operator without inputs cannot establish facts.`,e.id);let d=a[0]??{},f=o(d,`start_refs`);f.length||r(`error`,`start-refs`,`The flow requires starting references.`);for(let e of f)l.has(e)&&l.get(e)?.kind!==`operator`||r(`error`,`start-ref`,`Invalid flow starting reference: ${e}`);[`spec_version`,`created`,`modified`].some(e=>t[e]!==void 0)&&r(`warning`,`bundle-metadata`,`Nonstandard bundle metadata is preserved in the raw source and ignored for execution.`),[...i.values()].some(e=>e.ttp_frameworks!==void 0)&&r(`warning`,`builder-metadata`,`Builder ttp_frameworks metadata is preserved but does not affect execution.`),r(`info`,`validation-scope`,`Checked the M1a positive execution profile; this is not complete STIX schema validation. Raw source is preserved.`),r(`info`,`interpretation`,`Conditions are interpreted as persistent Boolean facts. Review initial facts and entry actions; start_refs does not mean an action has succeeded.`);let p=i.size-s.length;return p&&r(`info`,`context`,`${p} STIX context objects are preserved; they are not execution vertices.`),{name:typeof d.name==`string`?d.name:`Imported flow`,nodes:s,starts:f,diagnostics:n,contextCount:p}}var f=e=>e.nodes.filter(e=>e.kind!==`operator`&&e.incoming.length>1),p=(e,t)=>e.kind===`operator`?e.operator:t?.joins?.[e.id],m=(e,t)=>!e.diagnostics.some(e=>e.level===`error`)&&f(e).every(e=>[`AND`,`OR`].includes(t?.joins?.[e.id]??``));function h(e,t=`Baseline`){return{id:crypto.randomUUID(),name:t,initialFacts:e.starts.filter(t=>e.nodes.some(e=>e.id===t&&e.kind===`condition`)),entryActions:[],goal:``,disabled:[],efforts:{},notes:{},assumptions:``,prediction:``,reviewed:!1,joins:{}}}function g(e,t,n=!1){if(!u(t)||typeof t.id!=`string`||typeof t.name!=`string`||typeof t.goal!=`string`||typeof t.reviewed!=`boolean`||typeof t.assumptions!=`string`||typeof t.prediction!=`string`)throw Error(`Invalid scenario data.`);let r=new Map(e.nodes.map(e=>[e.id,e]));if(t.automatic!==void 0&&typeof t.automatic!=`boolean`)throw Error(`Invalid automatic setup flag.`);for(let[e,n]of[[`initialFacts`,`condition`],[`entryActions`,`action`],[`disabled`,`action`]]){if(!Array.isArray(t[e])||new Set(t[e]).size!==t[e].length)throw Error(`Invalid ${e} list.`);for(let i of t[e]){let t=r.get(i);if(!t||t.kind!==n||e===`entryActions`&&t.incoming.length)throw Error(`Invalid ${e} reference: ${i}`)}}if(t.goal&&![`condition`,`action`].includes(r.get(t.goal)?.kind??``))throw Error(`The goal must reference an existing condition or action completion.`);if(t.joins!==void 0){if(!u(t.joins))throw Error(`Invalid incoming-edge interpretations.`);for(let[e,n]of Object.entries(t.joins)){let t=r.get(e);if(!t||t.kind===`operator`||t.incoming.length<2||n!==`AND`&&n!==`OR`)throw Error(`Invalid incoming-edge interpretation.`)}}if(!u(t.efforts)||!u(t.notes))throw Error(`Invalid parameter tables.`);for(let[e,n,i]of[[`probabilities`,`action`,`string`],[`priors`,`condition`,`string`],[`evidence`,`condition`,`boolean`]]){let a=t[e];if(a!==void 0){if(!u(a))throw Error(`Invalid ${e} table.`);for(let[t,o]of Object.entries(a)){if(r.get(t)?.kind!==n||typeof o!==i)throw Error(`Invalid ${e} entry: ${t}`);typeof o==`string`&&o!==``&&v(o)}}}for(let[e,n]of Object.entries(t.efforts)){if(r.get(e)?.kind!==`action`||typeof n!=`string`)throw Error(`Effort must be keyed to an existing action ID.`);n!==``&&_(n)}for(let[e,n]of Object.entries(t.notes))if(r.get(e)?.kind!==`action`||typeof n!=`string`)throw Error(`Invalid action note.`);if(n&&(!m(e,t)||!t.reviewed&&!t.automatic||!t.goal))throw Error(`Resolve blocking compatibility issues and incoming-edge choices, review initial facts and entry actions, and select a goal before execution.`)}function _(e){if(!/^(?:0|[1-9]\d*)(?:\.\d{1,3})?$/.test(e.trim()))throw Error(`Effort must be nonnegative decimal hours, with at most three decimal places.`);let[t,n=``]=e.trim().split(`.`),r=Number(t)*1e3+Number(n.padEnd(3,`0`));if(!Number.isSafeInteger(r)||r>1e9)throw Error(`Each effort must be at most 1,000,000 hours.`);return r}function v(e){if(!/^(?:0(?:\.\d{1,4})?|1(?:\.0{1,4})?)$/.test(e.trim()))throw Error(`Probability must be a decimal between 0 and 1, with at most four decimals.`);return Number(e.trim())}var y=e=>(e/1e3).toFixed(3).replace(/\.?0+$/,``)||`0`;async function ee(e){let t=await crypto.subtle.digest(`SHA-256`,new TextEncoder().encode(e));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,`0`)).join(``)}async function te(e){let t=d(e),n=h(t);return r(t,n),{model:t,project:{kind:`m1a-companion-project`,version:1,profile:a,applicationVersion:i,sourceText:e,sourceSha256:await ee(e),scenarios:[n],selectedScenario:n.id}}}async function ne(e){if(new TextEncoder().encode(e).length>12582912)throw Error(`Project exceeds the 12 MiB limit.`);let t=JSON.parse(e);if(t?.kind!==`m1a-companion-project`||t.version!==1||t.profile!==`m1a-positive-1`||typeof t.sourceText!=`string`)throw Error(`Unsupported project format or execution-profile version.`);if(await ee(t.sourceText)!==t.sourceSha256)throw Error(`Project source digest does not match. The source may have changed.`);let n=d(t.sourceText);if(!Array.isArray(t.scenarios)||!t.scenarios.length||t.scenarios.length>50||new Set(t.scenarios.map(e=>e.id)).size!==t.scenarios.length)throw Error(`Invalid or duplicate project scenarios.`);if(t.scenarios.forEach(e=>g(n,e)),t.rules!==void 0&&await l(t.rules),t.unit!==void 0&&(typeof t.unit!=`string`||!t.unit.trim()||t.unit.length>40))throw Error(`Invalid cost unit.`);if(t.advanced!==void 0&&(!u(t.advanced)||[`probability`,`paths`,`metf`,`diagnostics`].some(e=>t.advanced[e]!==void 0&&typeof t.advanced[e]!=`boolean`)))throw Error(`Invalid advanced-view settings.`);if(!t.scenarios.some(e=>e.id===t.selectedScenario))throw Error(`Selected scenario does not exist.`);if(t.view){if(![`setup`,`execute`,`analysis`].includes(t.view.tab)||typeof t.view.zoom!=`number`||!Number.isFinite(t.view.zoom)||t.view.zoom<.1||t.view.zoom>2||!n.nodes.some(e=>e.id===t.view.selectedNode))throw Error(`Invalid saved view.`);if(!Array.isArray(t.view.history)||t.view.history.length>200||new Set(t.view.history).size!==t.view.history.length||t.view.history.some(e=>!n.nodes.some(t=>t.id===e&&t.kind===`action`)))throw Error(`Invalid saved execution history.`)}return{project:t,model:n}}function re(e,t,n){let r=new Map(e.nodes.filter(e=>e.kind===`condition`).map(e=>[e.label,e.id])),i=new Map(e.nodes.filter(e=>e.kind===`action`).map(e=>[e.label,e.id])),a=t.scenarios[0];a.initialFacts=n.initial_keys.map(e=>r.get(e)),a.goal=r.get(n.goal_key),a.efforts=Object.fromEntries(Object.entries(n.effort_by_key).map(([e,t])=>[i.get(e),String(t)])),a.notes=Object.fromEntries([...i.values()].map(e=>[e,n.basis])),a.reviewed=!0,a.automatic=!1,a.assumptions=`Prepared portal model. Positive facts persist; each action executes successfully at most once. Initial facts include portal reachability and password login enabled. Efforts are illustrative reference-adversary hours.`}function ie(e,t,n,r){let i=n.variants[r];if(!i)throw Error(`Unknown portal variant.`);let a=structuredClone(t);a.id=crypto.randomUUID(),a.name=r.replaceAll(`_`,` `),a.initialFacts=a.initialFacts.filter(t=>!i.remove_initial.includes(e.nodes.find(e=>e.id===t).label));for(let[t,n]of Object.entries(i.effort_overrides)){let r=e.nodes.find(e=>e.kind===`action`&&e.label===t);a.efforts[r.id]=String(n)}return a.assumptions+=`\nIntervention ${r}: removes initial facts [${i.remove_initial.join(`, `)}]; effort overrides ${JSON.stringify(i.effort_overrides)}.`,a}function ae(e,t,n){if(!e.incoming.length)return!1;let r=p(e,n);return e.incoming.length>1&&!r?!1:r===`AND`?e.incoming.every(e=>t.has(e)):e.incoming.some(e=>t.has(e))}function oe(e,t,n){let r=new Set(t),i=!0;for(;i;){i=!1;for(let t of e.nodes)t.kind!==`action`&&!r.has(t.id)&&t.incoming.length&&ae(t,r,n)&&(r.add(t.id),i=!0)}return[...r].sort()}var se=(e,t)=>({active:oe(e,t.initialFacts,t),history:[]});function ce(e,t,n){let r=new Set(n.active);return e.nodes.filter(e=>e.kind===`action`&&!r.has(e.id)&&!t.disabled.includes(e.id)&&(e.incoming.length?ae(e,r,t):t.entryActions.includes(e.id))).map(e=>e.id).sort()}function le(e,t,n,r){if(!ce(e,t,n).includes(r))throw Error(`Action is blocked, unavailable, or already executed.`);return{active:oe(e,[...n.active,r],t),history:[...n.history,r]}}function b(e,t,n){return n.reduce((n,r)=>le(e,t,n,r),se(e,t))}function ue(e,t){g(e,t,!0);let n=se(e,t);for(;!n.active.includes(t.goal);){let r=ce(e,t,n);if(!r.length)return n;for(let i of r)n=le(e,t,n,i)}return n}var de=(e,t)=>ue(e,t).active.includes(t.goal);function fe(e,t,n,r=new Set,i={remaining:150}){let a=e.nodes.find(e=>e.id===n);if(!a)throw Error(`Unknown node.`);let o=r.has(n),s=--i.remaining<0||r.size>20;return{id:n,active:t.active.includes(n),cycle:o,truncated:s,children:o||s?[]:a.incoming.map(a=>fe(e,t,a,new Set([...r,n]),i))}}var pe=Object.defineProperty,me=(e,t,n)=>t in e?pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,he=(e,t)=>{for(var n in t)pe(e,n,{get:t[n],enumerable:!0})},ge=(e,t,n)=>me(e,typeof t==`symbol`?t:t+``,n),_e={};he(_e,{Graph:()=>x,alg:()=>Ae});var ve=Object.defineProperty,ye=(e,t)=>{for(var n in t)ve(e,n,{get:t[n],enumerable:!0})},be=class{constructor(e){this._isDirected=!0,this._isMultigraph=!1,this._isCompound=!1,this._nodes={},this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={},this._nodeCount=0,this._edgeCount=0,this._defaultNodeLabelFn=()=>{},this._defaultEdgeLabelFn=()=>{},e&&(this._isDirected=`directed`in e?e.directed:!0,this._isMultigraph=`multigraph`in e&&e.multigraph,this._isCompound=`compound`in e&&e.compound),this._isCompound&&(this._parent={},this._children={},this._children[`\0`]={})}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(e){return this._defaultNodeLabelFn=typeof e==`function`?e:()=>e,this}nodeCount(){return this._nodeCount}nodes(){return Object.keys(this._nodes)}sources(){return this.nodes().filter(e=>Object.keys(this._in[e]).length===0)}sinks(){return this.nodes().filter(e=>Object.keys(this._out[e]).length===0)}setNodes(e,t){return e.forEach(e=>{t===void 0?this.setNode(e):this.setNode(e,t)}),this}setNode(e,t){return e in this._nodes?(arguments.length>1&&(this._nodes[e]=t),this):(this._nodes[e]=arguments.length>1?t:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]=`\0`,this._children[e]={},this._children[`\0`][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)}node(e){return this._nodes[e]}hasNode(e){return e in this._nodes}removeNode(e){if(e in this._nodes){let t=e=>this.removeEdge(this._edgeObjs[e]);delete this._nodes[e],this._isCompound&&(this._removeFromParentsChildList(e),delete this._parent[e],this.children(e).forEach(e=>{this.setParent(e)}),delete this._children[e]),Object.keys(this._in[e]).forEach(t),delete this._in[e],delete this._preds[e],Object.keys(this._out[e]).forEach(t),delete this._out[e],delete this._sucs[e],--this._nodeCount}return this}setParent(e,t){if(!this._isCompound)throw Error(`Cannot set parent in a non-compound graph`);if(t===void 0)t=`\0`;else{t+=``;for(let n=t;n!==void 0;n=this.parent(n))if(n===e)throw Error(`Setting `+t+` as parent of `+e+` would create a cycle`);this.setNode(t)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=t,this._children[t][e]=!0,this}parent(e){if(this._isCompound){let t=this._parent[e];if(t!==`\0`)return t}}children(e=`\0`){if(this._isCompound){let t=this._children[e];if(t)return Object.keys(t)}else{if(e===`\0`)return this.nodes();if(this.hasNode(e))return[]}return[]}predecessors(e){let t=this._preds[e];if(t)return Object.keys(t)}successors(e){let t=this._sucs[e];if(t)return Object.keys(t)}neighbors(e){let t=this.predecessors(e);if(t){let n=new Set(t),r=this.successors(e);if(r)for(let e of r)n.add(e);return Array.from(n.values())}}isLeaf(e){let t;return t=this.isDirected()?this.successors(e):this.neighbors(e),(t?.length??0)===0}filterNodes(e){let t=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});t.setGraph(this.graph()),Object.entries(this._nodes).forEach(([n,r])=>{e(n)&&t.setNode(n,r)}),Object.values(this._edgeObjs).forEach(e=>{t.hasNode(e.v)&&t.hasNode(e.w)&&t.setEdge(e,this.edge(e))});let n={},r=e=>{let i=this.parent(e);return!i||t.hasNode(i)?(n[e]=i,i):i in n?n[i]:r(i)};return this._isCompound&&t.nodes().forEach(e=>t.setParent(e,r(e))),t}setDefaultEdgeLabel(e){return this._defaultEdgeLabelFn=typeof e==`function`?e:()=>e,this}edgeCount(){return this._edgeCount}edges(){return Object.values(this._edgeObjs)}setPath(e,t){return e.reduce((e,n)=>(t===void 0?this.setEdge(e,n):this.setEdge(e,n,t),n)),this}setEdge(e,t,n,r){let i,a,o,s,c=!1;typeof e==`object`&&e&&`v`in e?(i=e.v,a=e.w,o=e.name,arguments.length===2&&(s=t,c=!0)):(i=e,a=t,o=r,arguments.length>2&&(s=n,c=!0)),i=``+i,a=``+a,o!==void 0&&(o=``+o);let l=Ce(this._isDirected,i,a,o);if(l in this._edgeLabels)return c&&(this._edgeLabels[l]=s),this;if(o!==void 0&&!this._isMultigraph)throw Error(`Cannot set a named edge when isMultigraph = false`);this.setNode(i),this.setNode(a),this._edgeLabels[l]=c?s:this._defaultEdgeLabelFn(i,a,o);let u=we(this._isDirected,i,a,o);return i=u.v,a=u.w,Object.freeze(u),this._edgeObjs[l]=u,xe(this._preds[a],i),xe(this._sucs[i],a),this._in[a][l]=u,this._out[i][l]=u,this._edgeCount++,this}edge(e,t,n){let r=arguments.length===1?Te(this._isDirected,e):Ce(this._isDirected,e,t,n);return this._edgeLabels[r]}edgeAsObj(e,t,n){let r=arguments.length===1?this.edge(e):this.edge(e,t,n);return typeof r!=`object`||!r?{label:r}:r}hasEdge(e,t,n){return(arguments.length===1?Te(this._isDirected,e):Ce(this._isDirected,e,t,n))in this._edgeLabels}removeEdge(e,t,n){let r=arguments.length===1?Te(this._isDirected,e):Ce(this._isDirected,e,t,n),i=this._edgeObjs[r];if(i){let e=i.v,t=i.w;delete this._edgeLabels[r],delete this._edgeObjs[r],Se(this._preds[t],e),Se(this._sucs[e],t),delete this._in[t][r],delete this._out[e][r],this._edgeCount--}return this}inEdges(e,t){return this.isDirected()?this.filterEdges(this._in[e],e,t):this.nodeEdges(e,t)}outEdges(e,t){return this.isDirected()?this.filterEdges(this._out[e],e,t):this.nodeEdges(e,t)}nodeEdges(e,t){if(e in this._nodes)return this.filterEdges({...this._in[e],...this._out[e]},e,t)}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}filterEdges(e,t,n){if(!e)return;let r=Object.values(e);return n?r.filter(e=>e.v===t&&e.w===n||e.v===n&&e.w===t):r}};function xe(e,t){e[t]?e[t]++:e[t]=1}function Se(e,t){e[t]!==void 0&&!--e[t]&&delete e[t]}function Ce(e,t,n,r){let i=``+t,a=``+n;if(!e&&i>a){let e=i;i=a,a=e}return i+``+a+``+(r===void 0?`\0`:r)}function we(e,t,n,r){let i=``+t,a=``+n;if(!e&&i>a){let e=i;i=a,a=e}let o={v:i,w:a};return r&&(o.name=r),o}function Te(e,t){return Ce(e,t.v,t.w,t.name)}ye({},{read:()=>ke,write:()=>Ee});function Ee(e){let t={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:De(e),edges:Oe(e)},n=e.graph();return n!==void 0&&(t.value=structuredClone(n)),t}function De(e){return e.nodes().map(t=>{let n=e.node(t),r=e.parent(t),i={v:t};return n!==void 0&&(i.value=n),r!==void 0&&(i.parent=r),i})}function Oe(e){return e.edges().map(t=>{let n=e.edge(t),r={v:t.v,w:t.w};return t.name!==void 0&&(r.name=t.name),n!==void 0&&(r.value=n),r})}function ke(e){let t=new be(e.options);return e.value!==void 0&&t.setGraph(e.value),e.nodes.forEach(e=>{t.setNode(e.v,e.value),e.parent&&t.setParent(e.v,e.parent)}),e.edges.forEach(e=>{t.setEdge({v:e.v,w:e.w,name:e.name},e.value)}),t}var Ae={};ye(Ae,{CycleException:()=>Ge,bellmanFord:()=>Me,components:()=>Pe,dijkstra:()=>Le,dijkstraAll:()=>ze,findCycles:()=>Ve,floydWarshall:()=>Ue,isAcyclic:()=>qe,postorder:()=>Ze,preorder:()=>Qe,prim:()=>$e,shortestPaths:()=>et,tarjan:()=>Be,topsort:()=>Ke});var je=()=>1;function Me(e,t,n,r){return Ne(e,String(t),n||je,r||function(t){return e.outEdges(t)??[]})}function Ne(e,t,n,r){let i={},a,o=0,s=e.nodes(),c=function(e){let t=i[e.v],r=i[e.w];if(!t||!r)return;let o=n(e);t.distance+o<r.distance&&(i[e.w]={distance:t.distance+o,predecessor:e.v},a=!0)},l=function(){s.forEach(function(e){r(e).forEach(function(t){let n=t.v===e?t.v:t.w,r=n===t.v?t.w:t.v;c({v:n,w:r})})})};s.forEach(function(e){i[e]={distance:e===t?0:1/0,predecessor:``}});let u=s.length;for(let e=1;e<u&&(a=!1,o++,l(),a);e++);if(o===u-1&&(a=!1,l(),a))throw Error(`The graph contains a negative weight cycle`);return i}function Pe(e){let t={},n=[],r;function i(n){var a,o;n in t||(t[n]=!0,r.push(n),(a=e.successors(n))==null||a.forEach(i),(o=e.predecessors(n))==null||o.forEach(i))}return e.nodes().forEach(function(e){r=[],i(e),r.length&&n.push(r)}),n}var Fe=class{constructor(){this._arr=[],this._keyIndices={}}size(){return this._arr.length}keys(){return this._arr.map(e=>e.key)}has(e){return e in this._keyIndices}priority(e){let t=this._keyIndices[e];if(t!==void 0)return this._arr[t].priority}min(){if(this.size()===0)throw Error(`Queue underflow`);return this._arr[0].key}add(e,t){let n=this._keyIndices,r=String(e);if(!(r in n)){let e=this._arr,i=e.length;return n[r]=i,e.push({key:r,priority:t}),this._decrease(i),!0}return!1}removeMin(){if(this.size()===0)throw Error(`Queue underflow`);this._swap(0,this._arr.length-1);let e=this._arr.pop();return delete this._keyIndices[e.key],this._heapify(0),e.key}decrease(e,t){let n=this._keyIndices[e];if(n===void 0)throw Error(`Key not found: ${e}`);let r=this._arr[n].priority;if(t>r)throw Error(`New priority is greater than current priority. Key: ${e} Old: ${r} New: ${t}`);this._arr[n].priority=t,this._decrease(n)}_heapify(e){let t=this._arr,n=2*e,r=n+1,i=e;n<t.length&&(i=t[n].priority<t[i].priority?n:i,r<t.length&&(i=t[r].priority<t[i].priority?r:i),i!==e&&(this._swap(e,i),this._heapify(i)))}_decrease(e){let t=this._arr,n=t[e].priority,r;for(;e!==0&&(r=e>>1,!(t[r].priority<n));)this._swap(e,r),e=r}_swap(e,t){let n=this._arr,r=this._keyIndices,i=n[e],a=n[t];n[e]=a,n[t]=i,r[a.key]=e,r[i.key]=t}},Ie=()=>1;function Le(e,t,n,r){return Re(e,String(t),n||Ie,r||function(t){return e.outEdges(t)??[]})}function Re(e,t,n,r){let i={},a=new Fe,o,s,c=function(e){let t=e.v===o?e.w:e.v,r=i[t];if(!r)return;let c=n(e),l=s.distance+c;if(c<0)throw Error(`dijkstra does not allow negative edge weights. Bad edge: `+e+` Weight: `+c);l<r.distance&&(r.distance=l,r.predecessor=o,a.decrease(t,l))};for(e.nodes().forEach(function(e){let n=e===t?0:1/0;i[e]={distance:n,predecessor:``},a.add(e,n)});a.size()>0;){o=a.removeMin();let e=i[o];if(!e||e.distance===1/0)break;s=e,r(o).forEach(c)}return i}function ze(e,t,n){return e.nodes().reduce(function(r,i){return r[i]=Le(e,i,t,n),r},{})}function Be(e){let t=0,n=[],r={},i=[];function a(o){var s;let c=r[o]={onStack:!0,lowlink:t,index:t++};if(n.push(o),(s=e.successors(o))==null||s.forEach(function(e){if(e in r){let t=r[e];t!=null&&t.onStack&&(c.lowlink=Math.min(c.lowlink,t.index))}else{a(e);let t=r[e];t&&(c.lowlink=Math.min(c.lowlink,t.lowlink))}}),c.lowlink===c.index){let e=[],t;do{t=n.pop();let i=r[t];i&&(i.onStack=!1),e.push(t)}while(o!==t);i.push(e)}}return e.nodes().forEach(function(e){e in r||a(e)}),i}function Ve(e){return Be(e).filter(function(t){let n=t[0];return n?t.length>1||t.length===1&&(e.outEdges(n,n)??[]).length>0:!1})}var He=()=>1;function Ue(e,t,n){return We(e,t||He,n||function(t){return e.outEdges(t)??[]})}function We(e,t,n){let r={},i=e.nodes();return i.forEach(function(e){let a={};r[e]=a,a[e]={distance:0,predecessor:``},i.forEach(function(t){e!==t&&(a[t]={distance:1/0,predecessor:``})}),n(e).forEach(function(n){let r=n.v===e?n.w:n.v,i=t(n);a[r]={distance:i,predecessor:e}})}),i.forEach(function(e){let t=r[e];t&&i.forEach(function(n){let a=r[n];a&&i.forEach(function(n){let r=a[e],i=t[n],o=a[n];if(r&&i&&o){let e=r.distance+i.distance;e<o.distance&&(o.distance=e,o.predecessor=i.predecessor)}})})}),r}var Ge=class extends Error{constructor(e){super(e),this.name=`CycleException`}};function Ke(e){let t={},n={},r=[];function i(a){var o;if(a in n)throw new Ge;a in t||(n[a]=!0,t[a]=!0,(o=e.predecessors(a))==null||o.forEach(i),delete n[a],r.push(a))}if(e.sinks().forEach(i),Object.keys(t).length!==e.nodeCount())throw new Ge;return r}function qe(e){try{Ke(e)}catch(e){if(e instanceof Ge)return!1;throw e}return!0}function Je(e,t,n,r,i){Array.isArray(t)||(t=[t]);let a=(t=>(e.isDirected()?e.successors(t):e.neighbors(t))??[]),o={};return t.forEach(function(t){if(!e.hasNode(t))throw Error(`Graph does not have node: `+t);i=Ye(e,t,n===`post`,o,a,r,i)}),i}function Ye(e,t,n,r,i,a,o){return t in r||(r[t]=!0,n||(o=a(o,t)),i(t).forEach(function(t){o=Ye(e,t,n,r,i,a,o)}),n&&(o=a(o,t))),o}function Xe(e,t,n){return Je(e,t,n,function(e,t){return e.push(t),e},[])}function Ze(e,t){return Xe(e,t,`post`)}function Qe(e,t){return Xe(e,t,`pre`)}function $e(e,t){var n;let r=new be,i={},a=new Fe,o;function s(e){let n=e.v===o?e.w:e.v,r=a.priority(n);if(r!==void 0){let s=t(e);s<r&&(i[n]=o,a.decrease(n,s))}}if(e.nodeCount()===0)return r;e.nodes().forEach(function(e){a.add(e,1/0),r.setNode(e)});let c=e.nodes()[0];c!==void 0&&a.decrease(c,0);let l=!1;for(;a.size()>0;){if(o=a.removeMin(),o in i)r.setEdge(o,i[o]);else{if(l)throw Error(`Input graph is not connected: `+e);l=!0}(n=e.nodeEdges(o))==null||n.forEach(s)}return r}function et(e,t,n,r){return tt(e,t,n,r??(t=>e.outEdges(t)??[]))}function tt(e,t,n,r){if(n===void 0)return Le(e,t,n,r);let i=!1,a=e.nodes();for(let o=0;o<a.length;o++){let s=a[o];if(s===void 0)continue;let c=r(s);for(let e=0;e<c.length;e++){let t=c[e];if(!t)continue;let r=t.v===s?t.v:t.w;n({v:r,w:r===t.v?t.w:t.v})<0&&(i=!0)}if(i)return Me(e,t,n,r)}return Le(e,t,n,r)}var x=be;function nt(e,t,n,r){let i=r;for(;e.hasNode(i);)i=_t(r);return n.dummy=t,e.setNode(i,n),i}function rt(e){let t=new x().setGraph(e.graph());return e.nodes().forEach(n=>t.setNode(n,e.node(n))),e.edges().forEach(n=>{let r=t.edge(n.v,n.w)||{weight:0,minlen:1},i=e.edge(n);t.setEdge(n.v,n.w,{weight:r.weight+i.weight,minlen:Math.max(r.minlen,i.minlen)})}),t}function it(e){let t=new x({multigraph:e.isMultigraph()}).setGraph(e.graph());return e.nodes().forEach(n=>{e.children(n).length||t.setNode(n,e.node(n))}),e.edges().forEach(n=>{t.setEdge(n,e.edge(n))}),t}function at(e,t){let n=e.x,r=e.y,i=t.x-n,a=t.y-r,o=e.width/2,s=e.height/2;if(!i&&!a)throw Error(`Not possible to find intersection inside of the rectangle`);let c,l;return i===0||Math.abs(a)*o>Math.abs(i)*s?(a<0&&(s=-s),c=s*i/a,l=s):(i<0&&(o=-o),c=o,l=o*a/i),{x:n+c,y:r+l}}function ot(e){let t=vt(ft(e)+1).map(()=>[]);return e.nodes().forEach(n=>{let r=e.node(n),i=r.rank;i!==void 0&&(t[i]||(t[i]=[]),t[i][r.order]=n)}),t}function st(e){let t=e.nodes().map(t=>{let n=e.node(t).rank;return n===void 0?Number.MAX_VALUE:n}),n=S(Math.min,t);e.nodes().forEach(t=>{let r=e.node(t);Object.hasOwn(r,`rank`)&&(r.rank-=n)})}function ct(e){let t=e.nodes().map(t=>e.node(t).rank).filter(e=>e!==void 0),n=S(Math.min,t),r=[];e.nodes().forEach(t=>{let i=e.node(t).rank-n;r[i]||(r[i]=[]),r[i].push(t)});let i=0,a=e.graph().nodeRankFactor;Array.from(r).forEach((t,n)=>{t===void 0&&n%a!==0?--i:t!==void 0&&i&&t.forEach(t=>e.node(t).rank+=i)})}function lt(e,t,n,r){let i={width:0,height:0};return arguments.length>=4&&(i.rank=n,i.order=r),nt(e,`border`,i,t)}function ut(e,t=dt){let n=[];for(let r=0;r<e.length;r+=t){let i=e.slice(r,r+t);n.push(i)}return n}var dt=65535;function S(e,t){return t.length>dt?e(...ut(t).map(t=>e(...t))):e(...t)}function ft(e){let t=e.nodes().map(t=>{let n=e.node(t).rank;return n===void 0?Number.MIN_VALUE:n});return S(Math.max,t)}function pt(e,t){let n={lhs:[],rhs:[]};return e.forEach(e=>{t(e)?n.lhs.push(e):n.rhs.push(e)}),n}function mt(e,t){let n=Date.now();try{return t()}finally{console.log(e+` time: `+(Date.now()-n)+`ms`)}}function ht(e,t){return t()}var gt=0;function _t(e){return e+(``+ ++gt)}function vt(e,t,n=1){t??(t=e,e=0);let r=e=>e<t;n<0&&(r=e=>t<e);let i=[];for(let t=e;r(t);t+=n)i.push(t);return i}function yt(e,t){let n={};for(let r of t)e[r]!==void 0&&(n[r]=e[r]);return n}function bt(e,t){let n;return n=typeof t==`string`?e=>e[t]:t,Object.entries(e).reduce((e,[t,r])=>(e[t]=n(r,t),e),{})}function xt(e,t){return e.reduce((e,n,r)=>(e[n]=t[r],e),{})}var St=`\0`;function Ct(e,t,n){if(!(e&&t&&n&&t.dummy===`edge`&&n.dummy===`edge`&&t.edgeObj&&n.edgeObj&&e[t.edgeObj.v]&&e[n.edgeObj.v]&&e[t.edgeObj.w]&&e[n.edgeObj.w]))return 0;let r=!0;t.edgeObj.w===n.edgeObj.w&&(r=!1);let i=r?e[t.edgeObj.v]?.rank??NaN:e[t.edgeObj.w]?.rank??NaN,a=Object.entries(e).find(e=>e[1].edgeObj?.v===t.edgeObj.v&&e[1].edgeObj?.w===t.edgeObj.w&&e[1].rank===i),o=Object.entries(e).find(e=>e[1].edgeObj?.v===n.edgeObj.v&&e[1].edgeObj?.w===n.edgeObj.w&&e[1].rank===i);if(!a||!o)return 0;let s=a[1].order??NaN,c=o[1].order??NaN;return isNaN(s-c)?0:s-c}var wt=`3.1.3`,Tt=class{constructor(){ge(this,`_sentinel`);let e={};e._next=e._prev=e,this._sentinel=e}dequeue(){let e=this._sentinel,t=e._prev;if(t!==e)return Et(t),t}enqueue(e){let t=this._sentinel;e._prev&&e._next&&Et(e),e._next=t._next,t._next._prev=e,t._next=e,e._prev=t}toString(){let e=[],t=this._sentinel,n=t._prev;for(;n!==t;)e.push(JSON.stringify(n,Dt)),n=n._prev;return`[`+e.join(`, `)+`]`}};function Et(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function Dt(e,t){if(e!==`_next`&&e!==`_prev`)return t}var Ot=Tt,kt=()=>1;function At(e,t){if(e.nodeCount()<=1)return[];let n=Nt(e,t||kt);return jt(n.graph,n.buckets,n.zeroIdx).flatMap(t=>e.outEdges(t.v,t.w)||[])}function jt(e,t,n){let r=[],i=t[t.length-1],a=t[0],o;for(;e.nodeCount();){for(;o=a.dequeue();)Mt(e,t,n,o);for(;o=i.dequeue();)Mt(e,t,n,o);if(e.nodeCount()){for(let i=t.length-2;i>0;--i)if(o=t[i]?.dequeue(),o){r=r.concat(Mt(e,t,n,o,!0)||[]);break}}}return r}function Mt(e,t,n,r,i){let a=[],o=i?a:void 0;return(e.inEdges(r.v)||[]).forEach(r=>{let o=e.edge(r),s=e.node(r.v);i&&a.push({v:r.v,w:r.w}),s.out-=o,Pt(t,n,s)}),(e.outEdges(r.v)||[]).forEach(r=>{let i=e.edge(r),a=r.w,o=e.node(a);o.in-=i,Pt(t,n,o)}),e.removeNode(r.v),o}function Nt(e,t){let n=new x,r=0,i=0;e.nodes().forEach(e=>{n.setNode(e,{v:e,in:0,out:0})}),e.edges().forEach(e=>{let a=n.edge(e.v,e.w)||0,o=t(e),s=a+o;n.setEdge(e.v,e.w,s);let c=n.node(e.v),l=n.node(e.w);i=Math.max(i,c.out+=o),r=Math.max(r,l.in+=o)});let a=Ft(i+r+3).map(()=>new Ot),o=r+1;return n.nodes().forEach(e=>{Pt(a,o,n.node(e))}),{graph:n,buckets:a,zeroIdx:o}}function Pt(e,t,n){var r,i,a;n.out?n.in?(a=e[n.out-n.in+t])==null||a.enqueue(n):(i=e[e.length-1])==null||i.enqueue(n):(r=e[0])==null||r.enqueue(n)}function Ft(e){let t=[];for(let n=0;n<e;n++)t.push(n);return t}function It(e,t){(e.graph().acyclicer===`greedy`?At(e,n(e)):Lt(e,t??null)).forEach(t=>{let n=e.edge(t);e.removeEdge(t),n.forwardName=t.name,n.reversed=!0,e.setEdge(t.w,t.v,n,_t(`rev`))});function n(e){return t=>e.edge(t).weight}}function Lt(e,t){let n=[],r={},i={};function a(t){Object.hasOwn(i,t)||(i[t]=!0,r[t]=!0,e.outEdges(t).forEach(e=>{Object.hasOwn(r,e.w)?n.push(e):a(e.w)}),delete r[t])}function o(a){var s;Object.hasOwn(i,a)||(i[a]=!0,r[a]=!0,(s=e.outEdges(a))==null||s.forEach(i=>{Object.hasOwn(r,i.w)||t.node(a)?.rank>t.node(i.w)?.rank&&zt(e,i.w,i)?n.push(i):o(i.w)}),delete r[a])}let s=a;return t&&typeof t.node==`function`&&(s=o),e.sources().forEach(s),e.nodes().forEach(s),n}function Rt(e){e.edges().forEach(t=>{let n=e.edge(t);if(n.reversed){e.removeEdge(t);let r=n.forwardName;delete n.reversed,delete n.forwardName,e.setEdge(t.w,t.v,n,r)}})}function zt(e,t,n){let r=new Set;function i(t){if(e.sources().includes(t))return!0;r.add(t);for(let a of e.inEdges(t)??[])if((a.v!==n.v||a.w!==n.w)&&!r.has(a.v)&&i(a.v))return!0;return!1}return i(t)}function Bt(e){e.graph().dummyChains=[],e.edges().forEach(t=>Vt(e,t))}function Vt(e,t){let n=t.v,r=e.node(n).rank,i=t.w,a=e.node(i).rank,o=t.name,s=e.edge(t),c=s.labelRank;if(a===r+1)return;e.removeEdge(t);let l,u,d=0;for(++r;r<a;++d,++r)s.points=[],u={width:0,height:0,edgeLabel:s,edgeObj:t,rank:r},l=nt(e,`edge`,u,`_d`),r===c&&(u.width=s.width,u.height=s.height,u.dummy=`edge-label`,u.labelpos=s.labelpos),e.setEdge(n,l,{weight:s.weight},o),d===0&&e.graph().dummyChains.push(l),n=l;e.setEdge(n,i,{weight:s.weight},o)}function Ht(e){e.graph().dummyChains.forEach(t=>{let n=e.node(t),r=n.edgeLabel,i;for(e.setEdge(n.edgeObj,r);n.dummy;)i=e.successors(t)[0],e.removeNode(t),r.points.push({x:n.x,y:n.y}),n.dummy===`edge-label`&&(r.x=n.x,r.y=n.y,r.width=n.width,r.height=n.height),t=i,n=e.node(t)})}function Ut(e){let t={};function n(r){let i=e.node(r);if(Object.hasOwn(t,r))return i.rank;t[r]=!0;let a=e.outEdges(r),o=a?a.map(t=>t==null?1/0:n(t.w)-e.edge(t).minlen):[],s=S(Math.min,o);return s===1/0&&(s=0),i.rank=s}e.sources().forEach(n)}function Wt(e,t){return e.node(t.w).rank-e.node(t.v).rank-e.edge(t).minlen}var Gt=Kt;function Kt(e){let t=new x({directed:!1}),n=e.nodes();if(n.length===0)throw Error(`Graph must have at least one node`);let r=n[0],i=e.nodeCount();t.setNode(r,{});let a,o;for(;qt(t,e)<i&&(a=Jt(t,e),a);)o=t.hasNode(a.v)?Wt(e,a):-Wt(e,a),Yt(t,e,o);return t}function qt(e,t){function n(r){let i=t.nodeEdges(r);i&&i.forEach(i=>{let a=i.v,o=r===a?i.w:a;!e.hasNode(o)&&!Wt(t,i)&&(e.setNode(o,{}),e.setEdge(r,o,{}),n(o))})}return e.nodes().forEach(n),e.nodeCount()}function Jt(e,t){return t.edges().reduce((n,r)=>{let i=1/0;return e.hasNode(r.v)!==e.hasNode(r.w)&&(i=Wt(t,r)),i<n[0]?[i,r]:n},[1/0,null])[1]}function Yt(e,t,n){e.nodes().forEach(e=>t.node(e).rank+=n)}var{preorder:Xt,postorder:Zt}=Ae,Qt=C;C.initLowLimValues=nn,C.initCutValues=$t,C.calcCutValue=tn,C.leaveEdge=an,C.enterEdge=on,C.exchangeEdges=sn;function C(e){e=rt(e),Ut(e);let t=Gt(e);nn(t),$t(t,e);let n,r;for(;n=an(t);)r=on(t,e,n),sn(t,e,n,r)}function $t(e,t){let n=Zt(e,e.nodes());n=n.slice(0,n.length-1),n.forEach(n=>en(e,t,n))}function en(e,t,n){let r=e.node(n).parent,i=e.edge(n,r);i.cutvalue=tn(e,t,n)}function tn(e,t,n){let r=e.node(n).parent,i=!0,a=t.edge(n,r),o=0;a||=(i=!1,t.edge(r,n)),o=a.weight;let s=t.nodeEdges(n);return s&&s.forEach(a=>{let s=a.v===n,c=s?a.w:a.v;if(c!==r){let r=s===i,l=t.edge(a).weight;if(o+=r?l:-l,ln(e,n,c)){let t=e.edge(n,c).cutvalue;o+=r?-t:t}}}),o}function nn(e,t){arguments.length<2&&(t=e.nodes()[0]),rn(e,{},1,t)}function rn(e,t,n,r,i){let a=n,o=e.node(r);t[r]=!0;let s=e.neighbors(r);return s&&s.forEach(i=>{Object.hasOwn(t,i)||(n=rn(e,t,n,i,r))}),o.low=a,o.lim=n++,i?o.parent=i:delete o.parent,n}function an(e){return e.edges().find(t=>e.edge(t).cutvalue<0)}function on(e,t,n){let r=n.v,i=n.w;t.hasEdge(r,i)||(r=n.w,i=n.v);let a=e.node(r),o=e.node(i),s=a,c=!1;return a.lim>o.lim&&(s=o,c=!0),t.edges().filter(t=>c===un(e,e.node(t.v),s)&&c!==un(e,e.node(t.w),s)).reduce((e,n)=>Wt(t,n)<Wt(t,e)?n:e)}function sn(e,t,n,r){let i=n.v,a=n.w;e.removeEdge(i,a),e.setEdge(r.v,r.w,{}),nn(e),$t(e,t),cn(e,t)}function cn(e,t){let n=e.nodes().find(t=>!e.node(t).parent);if(!n)return;let r=Xt(e,[n]);r=r.slice(1),r.forEach(n=>{let r=e.node(n).parent,i=t.edge(n,r),a=!1;i||(i=t.edge(r,n),a=!0),t.node(n).rank=t.node(r).rank+(a?i.minlen:-i.minlen)})}function ln(e,t,n){return e.hasEdge(t,n)}function un(e,t,n){return n.low<=t.lim&&t.lim<=n.lim}var dn=fn;function fn(e){let t=e.graph().ranker;if(typeof t==`function`)return t(e);switch(t){case`network-simplex`:hn(e);break;case`tight-tree`:mn(e);break;case`longest-path`:pn(e);break;case`none`:break;default:hn(e)}}var pn=Ut;function mn(e){Ut(e),Gt(e)}function hn(e){Qt(e)}var gn=_n;function _n(e){let t=yn(e),n=e.graph();Array.isArray(n.dummyChains)&&n.dummyChains.forEach(n=>{let r=e.node(n),i=r.edgeObj,a=vn(e,t,i.v,i.w),o=a.path,s=a.lca,c=0,l=o[c],u=!0;for(;n!==i.w;){if(r=e.node(n),u){for(;(l=o[c])!==s&&e.node(l).maxRank<r.rank;)c++;l===s&&(u=!1)}if(!u){for(;c<o.length-1&&e.node(o[c+1]).minRank<=r.rank;)c++;l=o[c]}l!==void 0&&e.setParent(n,l),n=e.successors(n)[0]}})}function vn(e,t,n,r){let i=[],a=[],o=Math.min(t[n].low,t[r].low),s=Math.max(t[n].lim,t[r].lim),c;c=n;do c=e.parent(c),i.push(c);while(c&&(t[c].low>o||s>t[c].lim));let l=c,u=r;for(;(u=e.parent(u))!==l;)a.push(u);return{path:i.concat(a.reverse()),lca:l}}function yn(e){let t={},n=0;function r(i){let a=n;e.children(i).forEach(r),t[i]={low:a,lim:n++}}return e.children(St).forEach(r),t}function bn(e){let t=nt(e,`root`,{},`_root`),n=Sn(e),r=Object.values(n),i=S(Math.max,r)-1,a=2*i+1;e.graph().nestingRoot=t,e.edges().forEach(t=>e.edge(t).minlen*=a);let o=Cn(e)+1;e.children(St).forEach(r=>{xn(e,t,a,o,i,n,r)}),e.graph().nodeRankFactor=a}function xn(e,t,n,r,i,a,o){let s=e.children(o);if(!s.length){o!==t&&e.setEdge(t,o,{weight:0,minlen:n});return}let c=lt(e,`_bt`),l=lt(e,`_bb`),u=e.node(o);e.setParent(c,o),u.borderTop=c,e.setParent(l,o),u.borderBottom=l,s.forEach(s=>{xn(e,t,n,r,i,a,s);let u=e.node(s),d=u.borderTop?u.borderTop:s,f=u.borderBottom?u.borderBottom:s,p=u.borderTop?r:2*r,m=d===f?i-(a[o]??0)+1:1;e.setEdge(c,d,{weight:p,minlen:m,nestingEdge:!0}),e.setEdge(f,l,{weight:p,minlen:m,nestingEdge:!0})}),e.parent(o)||e.setEdge(t,c,{weight:0,minlen:i+(a[o]??0)})}function Sn(e){let t={};function n(r,i){let a=e.children(r);a&&a.length&&a.forEach(e=>n(e,i+1)),t[r]=i}return e.children(St).forEach(e=>n(e,1)),t}function Cn(e){return e.edges().reduce((t,n)=>t+e.edge(n).weight,0)}function wn(e){let t=e.graph();e.removeNode(t.nestingRoot),delete t.nestingRoot,e.edges().forEach(t=>{e.edge(t).nestingEdge&&e.removeEdge(t)})}var Tn=En;function En(e){function t(n){let r=e.children(n),i=e.node(n);if(r.length&&r.forEach(t),i&&Object.hasOwn(i,`minRank`)){i.borderLeft=[],i.borderRight=[];for(let t=i.minRank,r=i.maxRank+1;t<r;++t)Dn(e,`borderLeft`,`_bl`,n,i,t),Dn(e,`borderRight`,`_br`,n,i,t)}}e.children(St).forEach(t)}function Dn(e,t,n,r,i,a){let o={width:0,height:0,rank:a,borderType:t},s=i[t][a-1],c=nt(e,`border`,o,n);i[t][a]=c,e.setParent(c,r),s&&e.setEdge(s,c,{weight:1})}function On(e){let t=e.graph().rankdir?.toLowerCase();(t===`lr`||t===`rl`)&&An(e)}function kn(e){let t=e.graph().rankdir?.toLowerCase();(t===`bt`||t===`rl`)&&Mn(e),(t===`lr`||t===`rl`)&&(Pn(e),An(e))}function An(e){e.nodes().forEach(t=>jn(e.node(t))),e.edges().forEach(t=>jn(e.edge(t)))}function jn(e){let t=e.width;e.width=e.height,e.height=t}function Mn(e){e.nodes().forEach(t=>Nn(e.node(t))),e.edges().forEach(t=>{var n;let r=e.edge(t);(n=r.points)==null||n.forEach(Nn),Object.hasOwn(r,`y`)&&Nn(r)})}function Nn(e){e.y=-e.y}function Pn(e){e.nodes().forEach(t=>Fn(e.node(t))),e.edges().forEach(t=>{var n;let r=e.edge(t);(n=r.points)==null||n.forEach(Fn),Object.hasOwn(r,`x`)&&Fn(r)})}function Fn(e){let t=e.x;e.x=e.y,e.y=t}function In(e,t=null){let n={},r=e.nodes().filter(t=>!e.children(t).length),i=r.map(t=>e.node(t).rank),a=vt(S(Math.max,i)+1).map(()=>[]);function o(t){if(n[t])return;n[t]=!0;let r=e.node(t);a[r.rank].push(t);let i=e.successors(t);i&&[...i].sort((e,t)=>s(e,t)).forEach(o)}r.sort((t,n)=>e.node(t).rank-e.node(n).rank).forEach(o);function s(n,r){return Ct(t,e.node(n),e.node(r))}return a}function Ln(e,t){let n=0;for(let r=1;r<t.length;++r)n+=Rn(e,t[r-1],t[r]);return n}function Rn(e,t,n){let r=xt(n,n.map((e,t)=>t)),i=t.flatMap(t=>{let n=e.outEdges(t);return n?n.map(t=>({pos:r[t.w],weight:e.edge(t).weight})).sort((e,t)=>e.pos-t.pos):[]}),a=1;for(;a<n.length;)a<<=1;let o=2*a-1;--a;let s=Array(o).fill(0),c=0;return i.forEach(e=>{let t=e.pos+a;s[t]+=e.weight;let n=0;for(;t>0;)t%2&&(n+=s[t+1]),t=t-1>>1,s[t]+=e.weight;c+=e.weight*n}),c}function zn(e,t=[]){return t.map(t=>{let n=e.inEdges(t);if(!n||!n.length)return{v:t};{let r=n.reduce((t,n)=>{let r=e.edge(n),i=e.node(n.v);return{sum:t.sum+r.weight*i.order,weight:t.weight+r.weight}},{sum:0,weight:0});return{v:t,barycenter:r.sum/r.weight,weight:r.weight}}})}function Bn(e,t){let n={};return e.forEach((e,t)=>{let r={indegree:0,in:[],out:[],vs:[e.v],i:t};e.barycenter!==void 0&&(r.barycenter=e.barycenter,r.weight=e.weight),n[e.v]=r}),t.edges().forEach(e=>{let t=n[e.v],r=n[e.w];t!==void 0&&r!==void 0&&(r.indegree++,t.out.push(r))}),Vn(Object.values(n).filter(e=>!e.indegree))}function Vn(e){let t=[];function n(e){return t=>{t.merged||(t.barycenter===void 0||e.barycenter===void 0||t.barycenter>=e.barycenter)&&Hn(e,t)}}function r(t){return n=>{n.in.push(t),--n.indegree===0&&e.push(n)}}for(;e.length;){let i=e.pop();t.push(i),i.in.reverse().forEach(n(i)),i.out.forEach(r(i))}return t.filter(e=>!e.merged).map(e=>yt(e,[`vs`,`i`,`barycenter`,`weight`]))}function Hn(e,t){let n=0,r=0;e.weight&&(n+=e.barycenter*e.weight,r+=e.weight),t.weight&&(n+=t.barycenter*t.weight,r+=t.weight),e.vs=t.vs.concat(e.vs),e.barycenter=n/r,e.weight=r,e.i=Math.min(t.i,e.i),t.merged=!0}function Un(e,t,n,r,i){let a={},o=null,s=null,c=i;typeof t==`boolean`?(c=t,a={}):t&&(a=t,o=n??null,s=r??null);let l=pt(e,e=>Object.hasOwn(e,`barycenter`)),u=l.lhs,d=l.rhs.sort((e,t)=>t.i-e.i),f=[],p=0,m=0,h=0;u.sort(Gn(s,o,!!c));for(let[e,t]of Object.entries(a)){let n=u.findIndex(t=>t.vs[0]===e);u.splice(n+1,0,t)}h=Wn(f,d,h),u.forEach(e=>{h+=e.vs.length,f.push(e.vs),p+=e.barycenter*e.weight,m+=e.weight,h=Wn(f,d,h)});let g={vs:f.flat(1)};return m&&(g.barycenter=p/m,g.weight=m),g}function Wn(e,t,n){let r;for(;t.length&&(r=t[t.length-1]).i<=n;)t.pop(),e.push(r.vs),n++;return n}function Gn(e,t,n){return(r,i)=>{if(r.barycenter<i.barycenter)return-1;if(r.barycenter>i.barycenter)return 1;if(e&&(typeof r.vs[0]==`string`||typeof i.vs[0]==`string`)){let n=Ct(t,e.node(r.vs[0]),e.node(i.vs[0]));if(n!==0)return n}return n?i.i-r.i:r.i-i.i}}function Kn(e,t,n,r,i){var a,o;let s=null,c=i;typeof r==`boolean`?(c=r,s=null):r!==void 0&&(s=r);let l=e.children(t),u=e.node(t),d=u?u.borderLeft:void 0,f=u?u.borderRight:void 0,p={};d&&(l=l.filter(e=>e!==d&&e!==f));let m=zn(e,l);m.forEach(t=>{if(e.children(t.v).length){let{result:r}=Kn(e,t.v,n,s,c);p[t.v]=r,Object.hasOwn(r,`barycenter`)&&Jn(t,r)}});let h=Bn(m,n);qn(h,p);let g={},_=!1;for(let t=0;t<h.length;t++)for(let n=t+1;n<h.length;n++)if(h[t]&&h[n]&&(a=h[t])!=null&&a.barycenter&&(o=h[n])!=null&&o.barycenter&&h[t]?.barycenter===h[n].barycenter){let r=h[t]?.vs[0]??``,i=h[n]?.vs[0]??``,a=e.node(r),o=e.node(i);if(a.dummy===`edge`&&o.dummy===`edge`&&a.edgeObj?.v===o.edgeObj?.v&&a.edgeObj?.w===o.edgeObj?.w){if(a.edgeLabel.reversed){g[i]=h[t],h.splice(t,1),t--;break}g[r]||(g[r]=h[n],h.splice(n,1),n--)}else _=!0}let v=Un(h,g,s,e,c);if(d&&f){v.vs=[d,v.vs,f].flat(1);let t=e.predecessors(d);if(t&&t.length){let n=e.node(t[0]),r=e.predecessors(f),i=e.node(r[0]);Object.hasOwn(v,`barycenter`)||(v.barycenter=0,v.weight=0),v.barycenter=(v.barycenter*v.weight+n.order+i.order)/(v.weight+2),v.weight+=2}}return Object.defineProperty(v,"result",{value:v,enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(v,"usedBias",{value:_,enumerable:!1,configurable:!0,writable:!0}),v}function qn(e,t){e.forEach(e=>{e.vs=e.vs.flatMap(e=>t[e]?t[e].vs:e)})}function Jn(e,t){e.barycenter===void 0?(e.barycenter=t.barycenter,e.weight=t.weight):(e.barycenter=(e.barycenter*e.weight+t.barycenter*t.weight)/(e.weight+t.weight),e.weight+=t.weight)}function Yn(e,t,n,r){r||=e.nodes();let i=Xn(e),a=new x({compound:!0}).setGraph({root:i}).setDefaultNodeLabel(t=>e.node(t));return r.forEach(r=>{let o=e.node(r),s=e.parent(r);if(o.rank===t||o.minRank<=t&&t<=o.maxRank){a.setNode(r),a.setParent(r,s||i);let c=e[n](r);c&&c.forEach(t=>{let n=t.v===r?t.w:t.v,i=a.edge(n,r),o=i===void 0?0:i.weight;a.setEdge(n,r,{weight:e.edge(t).weight+o})}),Object.hasOwn(o,`minRank`)&&a.setNode(r,{borderLeft:o.borderLeft[t],borderRight:o.borderRight[t]})}}),a}function Xn(e){let t;for(;e.hasNode(t=_t(`_root`)););return t}function Zn(e,t,n){let r={},i;n.forEach(n=>{let a=e.parent(n),o,s;for(;a;){if(o=e.parent(a),o?(s=r[o],r[o]=a):(s=i,i=a),s&&s!==a){t.setEdge(s,a);return}a=o}})}function Qn(e,t={},n=null){if(typeof t.customOrder==`function`){t.customOrder(e,Qn);return}let r=ft(e),i=$n(e,vt(1,r+1),`inEdges`),a=$n(e,vt(r-1,-1,-1),`outEdges`),o=In(e,n);if(tr(e,o),t.disableOptimalOrderHeuristic)return;let s=1/0,c,l=t.constraints||[];for(let t=0,r=0;r<4;++t,++r){er(t%2?i:a,t%4>=2,l,n),o=ot(e);let u=Ln(e,o);u<s?(r=0,c=Object.assign({},o),s=u):u===s&&(c=structuredClone(o))}tr(e,c)}function $n(e,t,n){let r=new Map,i=(e,t)=>{r.has(e)||r.set(e,[]),r.get(e).push(t)};for(let t of e.nodes()){let n=e.node(t);if(typeof n.rank==`number`&&i(n.rank,t),typeof n.minRank==`number`&&typeof n.maxRank==`number`)for(let e=n.minRank;e<=n.maxRank;e++)e!==n.rank&&i(e,t)}return t.map(function(t){return Yn(e,t,n,r.get(t)||[])})}function er(e,t,n,r){let i=!0,a=new x;e.forEach(function(e){n.forEach(e=>a.setEdge(e.left,e.right));let o=e.graph().root,{result:s,usedBias:c}=Kn(e,o,a,r,i);t&&c&&(i=!i),s.vs.forEach((t,n)=>e.node(t).order=n),Zn(e,a,s.vs)})}function tr(e,t){Object.values(t).forEach(t=>t.forEach((t,n)=>e.node(t).order=n))}function nr(e,t){let n={};function r(t,r){let i=0,a=0,o=t.length,s=r[r.length-1];return r.forEach((t,c)=>{let l=ir(e,t),u=l?e.node(l).order:o;(l||t===s)&&(r.slice(a,c+1).forEach(t=>{let r=e.predecessors(t);r&&r.forEach(r=>{let a=e.node(r),o=a.order;(o<i||u<o)&&!(a.dummy&&e.node(t).dummy)&&ar(n,r,t)})}),a=c+1,i=u)}),r}return t.length&&t.reduce(r),n}function rr(e,t){let n={};function r(t){return e.node(t)?.dummy===`border`}if(!e.nodes().some(r))return n;function i(t,r,i,a,o){vt(r,i).forEach(r=>{let i=t[r];if(i!==void 0&&e.node(i).dummy){let t=e.predecessors(i);t&&t.forEach(t=>{if(t===void 0)return;let r=e.node(t);r.dummy&&(r.order<a||r.order>o)&&ar(n,t,i)})}})}function a(t,n){let a=-1,o=-1,s=0;return n.forEach((c,l)=>{if(r(c)){let t=e.predecessors(c);if(t&&t.length){let r=t[0];if(r===void 0)return;o=e.node(r).order,i(n,s,l,a,o),s=l,a=o}}i(n,s,n.length,o,t.length)}),n}return t.length&&t.reduce(a),n}function ir(e,t){if(e.node(t).dummy){let n=e.predecessors(t);if(n)return n.find(t=>e.node(t).dummy)}}function ar(e,t,n){if(t>n){let e=t;t=n,n=e}let r=e[t];r||(e[t]=r={}),r[n]=!0}function or(e,t,n){if(t>n){let e=t;t=n,n=e}let r=e[t];return r!==void 0&&Object.hasOwn(r,n)}function sr(e,t,n,r,i){let a={},o={},s={};return t.forEach(e=>{e.forEach((e,t)=>{a[e]=e,o[e]=e,s[e]=t})}),t.forEach(t=>{let c=-1,l=-1,u=!1,d=t,f=t.findIndex(t=>i?.includes(t)||gr(t,e,i));f>0&&(d=[t[f],...t.slice(0,f),...t.slice(f+1)],u=!0),d.forEach(t=>{let d=r(t);if(d&&d.length){i!=null&&i.includes(t)&&(d=d.filter(t=>gr(t,e,i)));let r=d.sort((e,t)=>{let n=s[e],r=s[t];return(n===void 0?0:n)-(r===void 0?0:r)}),f=(r.length-1)/2;for(let e=Math.floor(f),i=Math.ceil(f);e<=i;++e){let i=r[e];if(i===void 0)continue;let d=s[i];if(d!==void 0&&o[t]===t&&c<d&&s[i]!==l&&!or(n,t,i)){let e=a[i];e!==void 0&&(o[i]=t,o[t]=a[t]=e,c=d,u&&=(c=-1,l=s[i]??-1,!1))}}}})}),{root:a,align:o}}function cr(e,t,n,r,i=!1){let a={},o=lr(e,t,n,i),s=i?`borderLeft`:`borderRight`;function c(e,t){let n=o.nodes().slice(),r={},i=n.pop();for(;i;){if(r[i])e(i);else{r[i]=!0,n.push(i);for(let e of t(i))n.push(e)}i=n.pop()}}function l(e){let t=o.inEdges(e);t?a[e]=t.reduce((e,t)=>{let n=a[t.v]??0,r=o.edge(t);return Math.max(e,n+(r===void 0?0:r))},0):a[e]=0}function u(t){let n=o.outEdges(t),r=1/0;n&&(r=n.reduce((e,t)=>{let n=a[t.w],r=o.edge(t);return Math.min(e,(n===void 0?0:n)-(r===void 0?0:r))},1/0));let i=e.node(t);r!==1/0&&i.borderType!==s&&(a[t]=Math.max(a[t]===void 0?0:a[t],r))}function d(e){return o.predecessors(e)||[]}function f(e){return o.successors(e)||[]}return c(l,d),c(u,f),Object.keys(r).forEach(e=>{let t=n[e];t!==void 0&&(a[e]=a[t]??0)}),a}function lr(e,t,n,r){let i=new x,a=e.graph(),o=mr(a.nodesep,a.edgesep,r);return t.forEach(t=>{let r;t.forEach(t=>{let a=n[t];if(a!==void 0){if(i.setNode(a),r!==void 0){let s=n[r];if(s!==void 0){let n=i.edge(s,a);i.setEdge(s,a,Math.max(o(e,t,r),n||0))}}r=t}})}),i}function ur(e,t){return Object.values(t).reduce((t,n)=>{let r=-1/0,i=1/0;Object.entries(n).forEach(([t,n])=>{let a=hr(e,t)/2;r=Math.max(n+a,r),i=Math.min(n-a,i)});let a=r-i;return a<t[0]&&(t=[a,n]),t},[1/0,null])[1]}function dr(e,t){let n=Object.values(t),r=S(Math.min,n),i=S(Math.max,n);[`u`,`d`].forEach(n=>{[`l`,`r`].forEach(a=>{let o=n+a,s=e[o];if(!s||s===t)return;let c=Object.values(s),l=r-S(Math.min,c);a!==`l`&&(l=i-S(Math.max,c)),l&&(e[o]=bt(s,e=>e+l))})})}function fr(e,t=void 0){let n=e.ul;return n?bt(n,(n,r)=>{if(t){let n=e[t.toLowerCase()];if(n&&n[r]!==void 0)return n[r]}let i=Object.values(e).map(e=>{let t=e[r];return t===void 0?0:t}).sort((e,t)=>e-t);return((i[1]??0)+(i[2]??0))/2}):{}}function pr(e,t){let n=ot(e),r=Object.assign(nr(e,n),rr(e,n)),i={},a;return[`u`,`d`].forEach(o=>{a=o===`u`?n:Object.values(n).reverse(),[`l`,`r`].forEach(n=>{n===`r`&&(a=a.map(e=>Object.values(e).reverse()));let s=sr(e,a,r,t=>(o===`u`?e.predecessors(t):e.successors(t))||[],t),c=cr(e,a,s.root,s.align,n===`r`);n===`r`&&(c=bt(c,e=>-e)),i[o+n]=c})}),dr(i,ur(e,i)),fr(i,e.graph().align)}function mr(e,t,n){return(r,i,a)=>{let o=r.node(i),s=r.node(a),c=0,l;if(c+=o.width/2,Object.hasOwn(o,`labelpos`))switch(o.labelpos.toLowerCase()){case`l`:l=-o.width/2;break;case`r`:l=o.width/2}if(l&&(c+=n?l:-l),l=void 0,c+=(o.dummy?t:e)/2,c+=(s.dummy?t:e)/2,c+=s.width/2,Object.hasOwn(s,`labelpos`))switch(s.labelpos.toLowerCase()){case`l`:l=s.width/2;break;case`r`:l=-s.width/2}return l&&(c+=n?l:-l),c}}function hr(e,t){return e.node(t).width}function gr(e,t,n){if(!n)return!1;let r=t.node(e)?.edgeObj;if(!r||t.node(e).edgeLabel.reversed)return!1;let i=n.indexOf(r?.v),a=n.indexOf(r?.w);return i!==-1&&a!==-1&&i===(a+1)%n.length||i===(a-1)%n.length}function _r(e,t){e=it(e),vr(e),Object.entries(pr(e,t)).forEach(([t,n])=>e.node(t).x=n)}function vr(e){let t=ot(e),n=e.graph(),r=n.ranksep,i=n.rankalign,a=0;t.forEach(t=>{let n=t.reduce((t,n)=>{let r=e.node(n).height??0;return t>r?t:r},0);t.forEach(t=>{let r=e.node(t);r.y=i===`top`?a+r.height/2:i===`bottom`?a+n-r.height/2:a+n/2}),a+=n+r})}var yr=new WeakMap;function br(e,t={}){return Sr(e,ht,t),e}function xr(e,t,n){let r=t;for(;r!==void 0;){let t=e.parent(r);if(t===n)return r;r=t}}function Sr(e,t,n){let r=e.nodes().filter(t=>e.children(t).length),i={};r.forEach(r=>{let a=e.node(r);if(a&&a.rankdir){let o=new x({multigraph:!0,compound:!0});o.setGraph({rankdir:a.rankdir});let s=e.children(r);s.forEach(t=>{let n={...e.node(t)};o.setNode(t,n);let i=e.parent(t);i&&i!==r&&s.includes(i)&&o.setParent(t,i)});let c=new Set;e.edges().forEach(t=>{let n=xr(e,t.v,r),i=xr(e,t.w,r);if(n===t.v&&i===t.w)o.setEdge(t,{...e.edge(t)});else if(n&&i&&n!==i){let r=`${n}\0${i}`;c.has(r)||(c.add(r),o.setEdge(n,i,{...e.edge(t)}))}}),Sr(o,t,n);let l=Pr(o);wr(l,t,n,null),Tr(o,l);let u=1/0,d=1/0,f=-1/0,p=-1/0;o.nodes().forEach(e=>{if(e===r)return;let t=o.node(e);t&&typeof t.x==`number`&&typeof t.y==`number`&&typeof t.width==`number`&&typeof t.height==`number`&&(u=Math.min(u,t.x-t.width/2),f=Math.max(f,t.x+t.width/2),d=Math.min(d,t.y-t.height/2),p=Math.max(p,t.y+t.height/2))}),isFinite(u)&&isFinite(d)&&isFinite(f)&&isFinite(p)||(u=d=0,f=p=0);let m=f-u,h=p-d;i[r]={minX:u,minY:d,maxX:f,maxY:p,width:m,height:h,offsetX:u,offsetY:d},a._dagreClusterSubgraph=o}});let a=[],o=t=>{let n=[],r=(e.children(t)||[]).filter(e=>e!==t);for(;r.length>0;){let t=r.shift();n.push(t),(e.children(t)||[]).filter(e=>e!==t).forEach(e=>r.push(e))}return n},s=new Map;r.forEach(t=>{let n=e.node(t);n&&n.rankdir&&i[t]&&s.set(t,(e.children(t)||[]).filter(e=>e!==t))});let c=new Set([...s.values()].flat()),l=new Map;s.forEach((e,t)=>{c.has(t)||l.set(t,o(t))});let u=new Set([...l.values()].flat()),d=e=>{for(let[t,n]of l)if(n.includes(e))return t;return e},f=[];e.edges().forEach(t=>{(u.has(t.v)||u.has(t.w))&&f.push({edge:t,label:e.edge(t)})});let p=new Map;u.forEach(t=>{let n=e.parent(t);p.set(t,typeof n==`string`?n:void 0)}),l.forEach((t,n)=>{let r=e.node(n),o=[];t.forEach(t=>{let n=e.node(t);n&&(o.push({id:t,node:n,parent:p.get(t)}),e.removeNode(t))});let s=f.filter(({edge:e})=>t.includes(e.v)||t.includes(e.w)),c=i[n];r&&(a.push({clusterId:n,subgraph:r._dagreClusterSubgraph,bounds:c,children:t,removedNodes:o,removedEdges:s}),r.width=c.width,r.height=c.height)});let m=new Set;f.forEach(({edge:t,label:n})=>{let r=d(t.v),i=d(t.w);if(r!==i&&e.hasNode(r)&&e.hasNode(i)){let t=`${r}\0${i}`;m.has(t)||(m.add(t),e.setEdge(r,i,{...n,width:0,height:0}))}});let h=Pr(e),g=wr(h,t,n,yr.get(e)??null);yr.set(e,g),Tr(e,h),m.forEach(t=>{let n=t.indexOf(`\0`),r=t.slice(0,n),i=t.slice(n+1);e.hasEdge(r,i)&&e.removeEdge(r,i)}),a.forEach(({clusterId:t,subgraph:n,bounds:r,removedNodes:i,removedEdges:a})=>{let o=e.node(t),s=o?.x??0,c=o?.y??0,l=(r.minX+r.maxX)/2,u=(r.minY+r.maxY)/2;i.forEach(({id:t,node:n,parent:r})=>{e.setNode(t,n),r!==void 0&&e.setParent(t,r)}),a.forEach(({edge:t,label:n})=>{e.setEdge(t,n)}),n.nodes().forEach(r=>{if(r===t)return;let i=n.node(r),a=e.node(r);a&&i&&typeof i.x==`number`&&typeof i.y==`number`&&(a.x=s+(i.x-l),a.y=c+(i.y-u))}),Cr(e,n,s-l,c-u),delete o._dagreClusterSubgraph}),r.forEach(t=>{let n=e.node(t),r=i[t];if(n&&n.rankdir&&n._dagreClusterSubgraph&&r){let i=n._dagreClusterSubgraph,a=n.x??0,o=n.y??0,s=(r.minX+r.maxX)/2,c=(r.minY+r.maxY)/2;i.nodes().forEach(n=>{if(n===t)return;let r=i.node(n),l=e.node(n);if(l&&r&&typeof r.x==`number`&&typeof r.y==`number`){let e=r.x-s,t=r.y-c;l.x=a+e,l.y=o+t}}),Cr(e,i,a-s,o-c),delete n._dagreClusterSubgraph}})}function Cr(e,t,n,r){t.edges().forEach(i=>{if(!e.hasEdge(i))return;let a=t.edge(i),o=e.edge(i);o.points=a.points.map(e=>({x:e.x+n,y:e.y+r})),Object.hasOwn(a,`x`)&&(o.x=a.x+n,o.y=a.y+r)})}function wr(e,t,n,r=null){var i,a;let o=n?.useDynamic!==!1,s=o&&(i=r?.graph)!=null?i:null,c=o&&(a=r?.rawNodes)!=null?a:null;t(`    makeSpaceForEdgeLabels`,()=>Fr(e)),t(`    removeSelfEdges`,()=>Wr(e)),t(`    acyclic`,()=>It(e,s)),t(`    nestingGraph.run`,()=>bn(e)),t(`    rank`,()=>dn(it(e))),t(`    injectEdgeLabelProxies`,()=>Ir(e)),t(`    removeEmptyRanks`,()=>ct(e)),t(`    nestingGraph.cleanup`,()=>wn(e)),t(`    normalizeRanks`,()=>st(e)),t(`    assignRankMinMax`,()=>Lr(e)),t(`    removeEdgeLabelProxies`,()=>Rr(e)),t(`    normalize.run`,()=>Bt(e)),t(`    parentDummyChains`,()=>gn(e)),t(`    addBorderSegments`,()=>Tn(e)),t(`    order`,()=>Qn(e,n,c)),t(`    insertSelfEdges`,()=>Gr(e)),t(`    adjustCoordinateSystem`,()=>On(e)),t(`    position`,()=>_r(e,n.corePath)),t(`    positionSelfEdges`,()=>Kr(e));let l=JSON.parse(JSON.stringify(e._nodes));return t(`    removeBorderNodes`,()=>Ur(e)),t(`    normalize.undo`,()=>Ht(e)),t(`    fixupEdgeLabelCoords`,()=>Vr(e)),t(`    undoCoordinateSystem`,()=>kn(e)),t(`    translateGraph`,()=>zr(e)),t(`    assignNodeIntersects`,()=>Br(e)),t(`    reversePoints`,()=>Hr(e)),t(`    acyclic.undo`,()=>Rt(e)),{graph:e,rawNodes:l}}function Tr(e,t){e.nodes().forEach(n=>{let r=e.node(n),i=t.node(n);r&&(r.x=i.x,r.y=i.y,r.order=i.order,r.rank=i.rank,t.children(n).length&&(r.width=i.width,r.height=i.height))}),e.edges().forEach(n=>{let r=e.edge(n),i=t.edge(n);r.points=i.points,Object.hasOwn(i,`x`)&&(r.x=i.x,r.y=i.y)}),e.graph().width=t.graph().width,e.graph().height=t.graph().height}var Er=[`nodesep`,`edgesep`,`ranksep`,`marginx`,`marginy`],Dr={ranksep:50,edgesep:20,nodesep:50,rankdir:`TB`,rankalign:`center`},Or=[`acyclicer`,`ranker`,`rankdir`,`align`,`rankalign`],kr=[`width`,`height`,`rank`],Ar={width:0,height:0},jr=[`minlen`,`weight`,`width`,`height`,`labeloffset`],Mr={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:`r`},Nr=[`labelpos`];function Pr(e){let t=new x({multigraph:!0,compound:!0}),n=Jr(e.graph());return t.setGraph(Object.assign({},Dr,qr(n,Er),yt(n,Or))),e.nodes().forEach(n=>{let r=qr(Jr(e.node(n)),kr);Object.keys(Ar).forEach(e=>{r[e]===void 0&&(r[e]=Ar[e])}),t.setNode(n,r);let i=e.parent(n);i!==void 0&&t.setParent(n,i)}),e.edges().forEach(n=>{let r=Jr(e.edge(n));t.setEdge(n,Object.assign({},Mr,qr(r,jr),yt(r,Nr)))}),t}function Fr(e){let t=e.graph();t.ranksep/=2,e.edges().forEach(n=>{let r=e.edge(n);r.minlen*=2,(r.labelpos??`r`).toLowerCase()!==`c`&&(t.rankdir===`TB`||t.rankdir===`BT`?r.width+=r.labeloffset:r.height+=r.labeloffset)})}function Ir(e){e.edges().forEach(t=>{let n=e.edge(t);if(n.width&&n.height){let n=e.node(t.v);nt(e,`edge-proxy`,{rank:(e.node(t.w).rank-n.rank)/2+n.rank,e:t},`_ep`)}})}function Lr(e){let t=0;e.nodes().forEach(n=>{let r=e.node(n);r.borderTop&&(r.minRank=e.node(r.borderTop).rank,r.maxRank=e.node(r.borderBottom).rank,t=Math.max(t,r.maxRank))}),e.graph().maxRank=t}function Rr(e){e.nodes().forEach(t=>{let n=e.node(t);if(n.dummy===`edge-proxy`){let r=n;e.edge(r.e).labelRank=n.rank,e.removeNode(t)}})}function zr(e){let t=1/0,n=0,r=1/0,i=0,a=e.graph(),o=a.marginx||0,s=a.marginy||0;function c(e){let a=e.x,o=e.y,s=e.width,c=e.height;t=Math.min(t,a-s/2),n=Math.max(n,a+s/2),r=Math.min(r,o-c/2),i=Math.max(i,o+c/2)}e.nodes().forEach(t=>c(e.node(t))),e.edges().forEach(t=>{let n=e.edge(t);Object.hasOwn(n,`x`)&&c(n)}),t-=o,r-=s,e.nodes().forEach(n=>{let i=e.node(n);i.x-=t,i.y-=r}),e.edges().forEach(n=>{let i=e.edge(n);i.points.forEach(e=>{e.x-=t,e.y-=r}),Object.hasOwn(i,`x`)&&(i.x-=t),Object.hasOwn(i,`y`)&&(i.y-=r)}),a.width=n-t+o,a.height=i-r+s}function Br(e){e.edges().forEach(t=>{if(t.v===t.w)return;let n=e.edge(t),r=e.node(t.v),i=e.node(t.w),a,o;n.points?(a=n.points[0],o=n.points[n.points.length-1]):(n.points=[],a=i,o=r),n.points.unshift(at(r,a)),n.points.push(at(i,o))})}function Vr(e){e.edges().forEach(t=>{let n=e.edge(t);if(Object.hasOwn(n,`x`))switch((n.labelpos===`l`||n.labelpos===`r`)&&(n.width-=n.labeloffset),n.labelpos){case`l`:n.x-=n.width/2+n.labeloffset;break;case`r`:n.x+=n.width/2+n.labeloffset}})}function Hr(e){e.edges().forEach(t=>{let n=e.edge(t);n.reversed&&n.points.reverse()})}function Ur(e){e.nodes().forEach(t=>{if(e.children(t).length){let n=e.node(t),r=e.node(n.borderTop),i=e.node(n.borderBottom),a=e.node(n.borderLeft[n.borderLeft.length-1]),o=e.node(n.borderRight[n.borderRight.length-1]);n.width=Math.abs(o.x-a.x),n.height=Math.abs(i.y-r.y),n.x=a.x+n.width/2,n.y=r.y+n.height/2}}),e.nodes().forEach(t=>{e.node(t).dummy===`border`&&e.removeNode(t)})}function Wr(e){e.edges().forEach(t=>{if(t.v===t.w){let n=e.node(t.v);n.selfEdges||=[],n.selfEdges.push({e:t,label:e.edge(t)}),e.removeEdge(t)}})}function Gr(e){ot(e).forEach(t=>{let n=0;t.forEach((t,r)=>{let i=e.node(t);typeof i.rank!=`number`&&(i.rank=0),i.order=r+n,(i.selfEdges||[]).forEach(t=>{nt(e,`selfedge`,{width:t.label.width,height:t.label.height,rank:i.rank,order:r+ ++n,e:t.e,edgeLabel:t.label},`_se`),Array.isArray(t.label.points)&&t.label.points.length===7||(t.label.points=[{x:0,y:-10},{x:0,y:-10},{x:0,y:0},{x:0,y:10},{x:0,y:10},{x:0,y:0},{x:0,y:0}])}),delete i.selfEdges})})}function Kr(e){e.nodes().forEach(t=>{let n=e.node(t),r=e=>typeof e==`number`&&isFinite(e);if(n.dummy===`selfedge`){let i=n,a=e.node(i.e.v),o=r(a?.x)?a.x:0,s=r(a?.y)?a.y:0,c=r(a?.width)?a.width:0,l=r(a?.height)?a.height:0,u=r(n.x)?n.x:o,d=r(n.y)?n.y:s,f=c/2,p=l/2;i.edgeLabel.points=[{x:u+f,y:d-p},{x:u+f,y:d-p},{x:u,y:d},{x:u-f,y:d+p},{x:u-f,y:d+p},{x:u,y:d},{x:u,y:d}],i.edgeLabel.x=u,i.edgeLabel.y=d,e.setEdge(i.e,i.edgeLabel),e.removeNode(t)}else n&&Array.isArray(n.selfEdges)&&n.selfEdges.forEach(e=>{if(!Array.isArray(e.label.points)||e.label.points.length!==7){let t=r(n.x)?n.x:0,i=r(n.y)?n.y:0,a=r(n.width)?n.width:0,o=r(n.height)?n.height:0,s=a/2,c=o/2;e.label.points=[{x:t+s,y:i-c},{x:t+s,y:i-c},{x:t,y:i},{x:t-s,y:i+c},{x:t-s,y:i+c},{x:t,y:i},{x:t,y:i}]}})})}function qr(e,t){return bt(yt(e,t),Number)}function Jr(e){let t={};return e&&Object.entries(e).forEach(([e,n])=>{typeof e==`string`&&(e=e.toLowerCase()),t[e]=n}),t}function Yr(e){let t=ot(e),n=new x({compound:!0,multigraph:!0}).setGraph({});return e.nodes().forEach(t=>{n.setNode(t,{label:t}),n.setParent(t,`layer`+e.node(t).rank)}),e.edges().forEach(e=>n.setEdge(e.v,e.w,{},e.name)),t.forEach((e,t)=>{let r=`layer`+t;n.setNode(r,{rank:`same`}),e.reduce((e,t)=>(n.setEdge(e,t,{style:`invis`}),t))}),n}var Xr={graphlib:_e,version:wt,layout:br,debug:Yr,util:{time:mt,notime:ht}},w=e=>String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function Zr(e,t=20){let n=e.slice(0,120).split(/\s+/),r=[],i=``;for(let e of n)(i+` `+e).length>t&&i&&(r.push(i),i=``),i+=(i?` `:``)+e;return i&&r.push(i),r.slice(0,3).map((e,n)=>e.length>t||n===2&&r.length>3?e.slice(0,t-1)+`…`:e)}function Qr(e,t,n,r,i,a={}){let o=new Xr.graphlib.Graph({multigraph:!0}).setGraph({rankdir:`LR`,nodesep:22,ranksep:45,marginx:26,marginy:26}).setDefaultEdgeLabel(()=>({}));for(let t of e.nodes)o.setNode(t.id,{width:t.kind===`action`?80:t.kind===`operator`?48:154,height:t.kind===`action`?80:t.kind===`operator`?48:60});for(let t of e.nodes)for(let n of t.outgoing)e.nodes.some(e=>e.id===n)&&o.setEdge(t.id,n,{},`${t.id}:${n}`);Xr.layout(o);let{width:s=800,height:c=600}=o.graph(),l=ce(e,t,n),u=new Set(n.active);return{width:s,height:c,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${c}" width="${s}" height="${c}" role="group" aria-label="Fact and action dependency graph"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10Z" fill="#83948e"/></marker></defs>${o.edges().map(e=>{let t=o.edge(e).points??[];return`<polyline class="edge ${u.has(e.v)?`live`:``}" points="${t.map(e=>`${e.x},${e.y}`).join(` `)}" marker-end="url(#arrow)"/>`}).join(``)}${e.nodes.map(e=>{let n=o.node(e.id),s=Zr(i(e),e.kind===`action`?10:20),c=`node ${e.kind} ${u.has(e.id)?`active`:``} ${l.includes(e.id)?`enabled`:``} ${t.disabled.includes(e.id)?`unavailable`:``} ${e.id===r?`selected`:``} ${e.id===t.goal?`goal`:``} ${e.id===a.stepping?`stepping`:``} ${a.fresh?.has(e.id)?`fresh`:``}`,d=e.kind===`action`?`<circle r="39"/>`:e.kind===`operator`?`<path d="M0,-24 24,0 0,24 -24,0Z"/>`:`<rect x="-77" y="-30" width="154" height="60" rx="3"/>`,f=u.has(e.id)?e.kind===`action`?`executed`:`true`:l.includes(e.id)?`enabled`:t.disabled.includes(e.id)?`unavailable`:`not established`,m=e.kind!==`operator`&&e.incoming.length>1?p(e,t)??`CHOOSE AND/OR`:``;return`<g class="${c}" transform="translate(${n.x},${n.y})" role="button" tabindex="0" data-node="${w(e.id)}" aria-label="${w(i(e))}: ${f}${m?`, inputs: `+m:``}"><title>${w(i(e))}\n${w(e.id)}\n${f}${m?`
Scenario inputs: `+m:``}</title>${d}<text text-anchor="middle">${s.map((e,t)=>`<tspan x="0" y="${(t-(s.length-1)/2)*15+4}">${w(e)}</tspan>`).join(``)}</text>${m?`<text text-anchor="middle" y="${e.kind===`action`?52:43}" style="font-size:10px">${m} (scenario)</text>`:``}${e.kind!==`operator`&&u.has(e.id)?`<text class="check" x="${e.kind===`action`?28:64}" y="-22">✓</text>`:``}</g>`}).join(``)}</svg>`}}function $r(e,t,n,r){let i=[];for(let t of e.states)(i[t.layer]??=[]).push(t.key);let a=new Map,o=Math.max(1,...i.map(e=>e?.length??0));i.forEach((e,t)=>e?.forEach((n,r)=>a.set(n,{x:30+t*230+84,y:30+(r+(o-e.length)/2)*92+35})));let s=60+Math.max(1,i.length)*230-62,c=60+o*92,l=new Map,u=e.edges.map(e=>{let n=a.get(e.from),i=a.get(e.to);if(!n||!i)return``;let o=e.from+`>`+e.to,s=l.get(o)??0;l.set(o,s+1);let c=n.x+84,u=n.y,d=i.x-84,f=i.y,p=(s%2?1:-1)*Math.ceil(s/2)*30,m=(c+d)/2,h=(u+f)/2+p,g=(u+f)/4+h/2,_=`${e.from}>${e.to}>${e.action}`;return`<g class="${`sedge ${e.blocked?`blocked`:``} ${t.traceEdges.has(_)?`trace`:``} ${t.witness.has(_)?`witness`:``}`}"><title>${w(r(e.action))}${e.blocked?` (blocked in this scenario)`:``}</title><path d="M${c},${u} Q${m},${h} ${d},${f}" marker-end="url(#${e.blocked?`sarrow-blocked`:`sarrow`})"/><text x="${m}" y="${g-4}" text-anchor="middle">${e.blocked?`✗ `:``}${w(r(e.action).slice(0,18))}</text></g>`}).join(``),d=new Map(t.trace.map((e,t)=>[e,t]));return{width:s,height:c,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${c}" width="${s}" height="${c}" role="group" aria-label="State graph: each box is a set of facts held"><defs><marker id="sarrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10Z" fill="#83948e"/></marker><marker id="sarrow-blocked" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10Z" fill="#c9877a"/></marker></defs>${u}${e.states.map(e=>{let r=a.get(e.key),i=t.names.get(e.key)??`?`,o=e.acquired.length||e.completions.length?[...e.acquired.map(n),...e.completions.map(e=>`✓ `+n(e))]:[`initial facts I`],s=o.slice(0,3).map(e=>e.length>24?e.slice(0,23)+`…`:e);o.length>3&&(s[2]=`+ ${o.length-2} more facts`);let c=`snode ${e.initial?`initial`:``} ${e.goal?`goal`:``} ${d.has(e.key)?`visited`:``} ${t.current===e.key?`current`:``} ${e.inScenario?e.canReachGoal?``:`deadend`:`outside`}`,l=`${i}: I${o[0]===`initial facts I`?``:` + `+o.join(`, `)}${e.goal?` (goal state)`:``}${e.inScenario?``:` (not reachable in this scenario)`}`;return`<g class="${c}" transform="translate(${r.x-84},${r.y-35})" tabindex="0" role="img" aria-label="${w(l)}"><title>${w(l)}</title><rect width="168" height="70" rx="12"/><text x="10" y="17" class="sname">${w(i)}${e.goal?` · goal`:``}</text>${s.map((e,t)=>`<text x="10" y="${34+t*13}">${t===0&&o[0]!==`initial facts I`?`I + `:``}${w(e)}</text>`).join(``)}${d.has(e.key)?`<circle cx="164" cy="4" r="10" class="step"/><text x="164" y="8" text-anchor="middle" class="stepn">${d.get(e.key)}</text>`:``}</g>`}).join(``)}</svg>`}}function ei(e){let t=new Map(e.nodes.map(e=>[e.id,e])),n=new Set;for(let r of e.nodes.filter(e=>e.kind===`action`)){let e=[...r.outgoing],i=new Set;for(;e.length;){let a=e.pop();if(i.has(a))continue;i.add(a);let o=t.get(a);if(o){if(o.kind===`action`){n.add(r.id);break}o.kind===`operator`&&e.push(...o.outgoing)}}}return n}function ti(e,t){let n=ei(e);return e.nodes.find(e=>e.id===t.goal)?.kind===`action`&&n.add(t.goal),n}function ni(e,t){let n=n=>e.nodes.filter(e=>e.kind===n&&!e.incoming.length&&e.id!==t.goal).map(e=>e.id);return{...t,name:`all inputs available`,initialFacts:[...new Set([...t.initialFacts,...n(`condition`)])].sort(),entryActions:[...new Set([...t.entryActions,...n(`action`)])].sort(),disabled:[]}}function ri(e,t){return{...e,initialFacts:[...new Set([...e.initialFacts,...t.initialFacts])].sort(),entryActions:[...new Set([...e.entryActions,...t.entryActions])].sort(),disabled:[],joins:{...t.joins,...e.joins}}}function ii(e,t,n=ei(e)){let r=new Map(e.nodes.map(e=>[e.id,e.kind]));return t.active.filter(e=>r.get(e)===`condition`||n.has(e)).sort().join(`|`)}var ai={stateGraph:[{cite:`Phillips and Swiler (1998), §1`,what:`attack graphs whose nodes are states`},{cite:`Sheyner et al. (2002)`,what:`state-enumeration attack graphs`}],blocked:[{cite:`Jha, Sheyner and Wing (2002), §5`,what:`choosing defence sets that remove transitions`}],paths:[{cite:`Idika and Bhargava (2012), §3.2`,what:`path metrics SP, NP, MPL, NMPL, SD, mode, median`}],metf:[{cite:`Ortalo, Deswarte and Kaâniche (1999), §§2.3–2.5`,what:`mean effort to security failure (METF) under shortest-path, total-memory and memoryless attackers`}],probability:[{cite:`Poolsappasit, Dewri and Ray (2012), §§4.1–4.4`,what:`Bayesian attack graphs (compare their semantics with this tab’s)`}]},oi=e=>ai[e].map(e=>e.cite).join(`; `),si=e=>e.flatMap(e=>ai[e]).map(e=>`- ${e.cite}: ${e.what}.`).join(`
`),ci=`m1a-metf-tm-1`,li=JSON.parse(t),ui=await ee(e),{model:T,project:E}=await te(e);re(T,E,li);var D=`execute`,O=T.nodes.find(e=>e.label===`login`).id,k=[],A=.85,j=!1,M=``,N=``,P=null,di=null,fi=null,pi=[],mi=`Loading supplied examples…`,hi=``,gi=!1,_i=new Map,F=`dependency`,I={stopAtGoal:!0,onlyGoalReaching:!1,compareWith:`all`},vi=`sequences`,L=new Map,R=new Map,z=new Map,B=null,V,yi=1,bi=`history`,xi=typeof matchMedia==`function`&&matchMedia(`(prefers-reduced-motion: reduce)`).matches,Si=80,Ci={portal_reachable:`portal reachable`,x_contactable:`X contactable`,helpdesk_reachable:`help desk reachable`,phishing_feasible:`phishing feasible`,reset_feasible:`impersonation feasible`,login_allowed:`password login enabled`,authorised:`account authorised for records`,sqli_feasible:`injection feasible`,db_reads_target:`database reaches records`,credential:`credential held`,session:`session held`,goal:`X's records read`},wi=()=>E.sourceSha256===ui,H=e=>wi()?Ci[e.label]??e.label:e.label,U=e=>T.nodes.find(t=>t.id===e),W=()=>E.scenarios.find(e=>e.id===E.selectedScenario),G=e=>{let{probabilities:t,priors:n,evidence:r,...i}=e;return E.sourceSha256+JSON.stringify(i)},Ti=e=>E.sourceSha256+JSON.stringify(e),K=()=>E.unit??`reference hours`,Ei=()=>K()===`reference hours`?`h`:K(),Di=()=>!!E.advanced?.probability||E.scenarios.some(e=>Object.keys(e.probabilities??{}).length||Object.keys(e.priors??{}).length),Oi=()=>!!E.advanced?.paths,ki=()=>!!E.advanced?.metf,Ai=()=>!!E.advanced?.diagnostics,ji=!1,Mi=!1,Ni=()=>[`setup`,`execute`,`analysis`,...Di()?[`probability`]:[]],q=()=>{try{return g(T,W(),!0),!0}catch{return!1}},J=e=>{let t=_i.get(e.id);return t?.fingerprint===G(e)?t.result:void 0},Y=()=>T.nodes.filter(e=>e.kind===`action`),Pi=()=>T.nodes.filter(e=>e.kind===`condition`),Fi=()=>b(T,W(),k),Ii=()=>B?b(T,W(),B.seq.slice(0,B.step)):Fi();function X(){P?.terminate(),P=null,N=``,di?.(null),di=null}function Li(){for(let e of z.values())e.terminate();z.clear()}function Z(){V&&clearInterval(V),V=void 0,B=null}function Ri(){X(),Li(),Z(),_i.delete(W().id),k=[],j=!0,M=`Assumptions changed. Execution reset and previous results invalidated.`}function Q(e,t=W()){return e===`states`?`states|${G(t)}|${I.stopAtGoal}|${I.onlyGoalReaching}|${JSON.stringify(Ki(t)??null)}`:e===`paths`?`paths|${G(t)}|${vi}`:e===`metf`?`metf|${G(t)}`:`probability|${Ti(t)}`}function zi(e){let t=W(),n=Q(e,t);if(L.has(n)||z.has(n))return;try{g(T,t,!0)}catch(e){R.set(n,e instanceof Error?e.message:String(e));return}for(let[t,n]of z)t.startsWith(e+`|`)&&(n.terminate(),z.delete(t));let r=crypto.randomUUID(),i=new Worker(new URL(new URL(`worker-DZYm4JCr.js`,import.meta.url).href,``+import.meta.url),{type:`module`});z.set(n,i),R.delete(n),i.onmessage=e=>{e.data.requestId===r&&e.data.states===void 0&&(e.data.error?R.set(n,e.data.error):L.set(n,e.data.result),i.terminate(),z.delete(n),$())},i.onerror=e=>{R.set(n,`Worker error: ${e.message}`),i.terminate(),z.delete(n),$()},i.postMessage({job:e,requestId:r,model:T,scenario:structuredClone(t),...e===`states`?{options:{stopAtGoal:I.stopAtGoal,onlyGoalReaching:I.onlyGoalReaching,reference:Ki(t)}}:e===`paths`?{convention:vi}:{}})}function Bi(e,t,n=`application/json`){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,i.click(),setTimeout(()=>URL.revokeObjectURL(r),2e3)}function Vi(e,t=0){if(t>12)return`<li>Further dependencies: select the upstream node to inspect.</li>`;let n=U(e.id);if(!n)return``;let r=e.children.length?`<ul>${e.children.map(e=>Vi(e,t+1)).join(``)}</ul>`:``,i=n.kind===`condition`&&e.children.length;return`<li><span class="truth ${e.active?`yes`:``}">${e.active?`✓`:`○`}</span> <button class="text-button" data-node="${w(n.id)}">${w(H(n))}</button> <small>${n.kind===`operator`?n.operator===`AND`?`all inputs required`:`any input suffices`:n.kind===`action`?`successful completion`:e.active?`true`:`not established`}</small>${e.cycle?`<em> — cyclic dependency</em>`:e.truncated?`<em> — select this node for further dependencies</em>`:i?`<details><summary>How can this fact be established?</summary>${r}</details>`:r}</li>`}function Hi(){let e=W(),t=Y().filter(e=>!e.incoming.length);return`<h2>Initial facts and goal</h2><p class="muted">Checked facts start true. Unchecked facts are not established; this is a modelling assumption.</p>
    <label class="field">Goal<select id="goal"><option value="">Choose a goal…</option><optgroup label="Fact established">${Pi().map(t=>`<option value="${w(t.id)}" ${e.goal===t.id?`selected`:``}>${w(H(t))}</option>`).join(``)}</optgroup><optgroup label="Action completed successfully">${Y().map(t=>`<option value="${w(t.id)}" ${e.goal===t.id?`selected`:``}>${w(H(t))} — completed</option>`).join(``)}</optgroup></select></label>
    ${f(T).length?`<fieldset class="join-choices"><legend>Interpret incoming edges</legend><p>Several incoming edges have no explicit operator. New imports default to OR (any input suffices); choose AND if all inputs are required. This is an editable scenario assumption, not a claim about the incident. Source operators are unchanged.</p>${f(T).map(t=>`<label class="field">${w(H(t))}<select data-join="${w(t.id)}" aria-label="Incoming edges for ${w(H(t))}"><option value="">Choose AND or OR…</option><option value="AND" ${e.joins?.[t.id]===`AND`?`selected`:``}>AND — all inputs required</option><option value="OR" ${e.joins?.[t.id]===`OR`?`selected`:``}>OR — any input suffices</option></select></label><ul>${t.incoming.map(e=>`<li>${w(H(U(e)))}</li>`).join(``)}</ul>`).join(``)}</fieldset>`:``}
    <fieldset class="fact-list"><legend>Facts true initially</legend>${Pi().map(t=>`<label><input type="checkbox" data-initial="${w(t.id)}" ${e.initialFacts.includes(t.id)?`checked`:``}>${w(H(t))}</label>`).join(``)}</fieldset>
    ${t.length?`<fieldset><legend>Entry actions with no prerequisites</legend><p class="muted">Enabled by default on import; these actions still need to be executed and charged.</p>${t.map(t=>`<label><input type="checkbox" data-entry="${w(t.id)}" ${e.entryActions.includes(t.id)?`checked`:``}>${w(H(t))}</label>`).join(``)}</fieldset>`:``}
    <label class="field">Scenario assumptions<textarea id="assumptions" rows="3">${w(e.assumptions)}</textarea></label>
    <label class="review"><input type="checkbox" id="reviewed" ${e.reviewed?`checked`:``} ${m(T,e)?``:`disabled`}>${e.automatic?`Optional personal review: `:``}I reviewed the course interpretation, incoming-edge choices, initial facts, entry actions and goal.</label>
    <h2>Action effort</h2><p class="muted">${K()===`reference hours`?`Reference-adversary hours, not elapsed time or probabilities.`:`Costs in ${w(K())}, as in the source example; not probabilities.`} Availability is a separate assumption.</p>
    <table class="costs"><thead><tr><th>Available</th><th>Action</th><th>${w(Ei()===`h`?`Hours`:K())}</th></tr></thead><tbody>${Y().map(t=>`<tr><td><input aria-label="Available ${w(H(t))}" type="checkbox" data-available="${w(t.id)}" ${e.disabled.includes(t.id)?``:`checked`}></td><th><button class="text-button" data-node="${w(t.id)}">${w(H(t))}</button><small title="${w(t.id)}">…${w(t.id.slice(-8))}</small></th><td><input class="effort" inputmode="decimal" aria-label="Effort for ${w(H(t))}" data-effort="${w(t.id)}" value="${w(e.efforts[t.id]??``)}" placeholder="Required"></td></tr>`).join(``)}</tbody></table>
    <p class="muted tiny">Up to 3 decimal places (storage precision, not an accuracy claim); maximum 1,000,000 hours per action. Missing effort still allows Boolean execution.</p>`}function Ui(){let e=W(),t=Fi(),n=U(O),r=ce(T,e,t),i=n?.kind===`action`?t.active.includes(n.id)?`Executed successfully`:e.disabled.includes(n.id)?`Unavailable in this scenario`:r.includes(n.id)?`Enabled — prerequisites hold`:`Blocked — prerequisites missing`:t.active.includes(O)?`True / established`:`Not established`;return`<div class="panel-heading"><h2>Explore an action</h2><span class="badge">${r.length} enabled</span></div><p class="muted">Select any node to inspect its meaning. Actions below execute assuming success.</p>
    <div class="action-picker">${Y().map(n=>`<button class="${n.id===O?`chosen`:``}" data-node="${w(n.id)}">${w(H(n))}<span>${t.active.includes(n.id)?`✓ done`:e.disabled.includes(n.id)?`off`:r.includes(n.id)?`enabled`:`blocked`}</span></button>`).join(``)}</div>
    ${n?`<section class="inspector"><p class="eyebrow">${n.kind===`action`?`ACTION RULE`:n.kind.toUpperCase()}</p><h3>${w(H(n))}</h3><p class="node-status ${r.includes(n.id)?`yes`:``}">${w(i)}</p><details><summary>Original ID and description</summary><code>${w(n.id)}</code><p>${w(n.description||`No description supplied.`)}</p></details>
    <h4>Required inputs${n.incoming.length>1?` · ${p(n,e)??`unresolved — choose in Setup`}`:``}</h4>${n.incoming.length>1?`<p class="muted">${p(n,e)===`AND`?`All inputs must hold.`:p(n,e)===`OR`?`Any one input suffices.`:`Execution is blocked until the incoming-edge interpretation is chosen.`}${n.kind===`operator`?``:` This is a scenario assumption, not an operator in the source.`}</p>`:``}${n.incoming.length?`<ul class="requirements">${fe(T,t,n.id).children.map(e=>Vi(e)).join(``)}</ul>`:`<p class="muted">${n.kind===`action`?e.entryActions.includes(n.id)?`Approved entry action.`:`No prerequisites declared. Review this as an entry action in Setup.`:`An initial assumption with no producer.`}</p>`}
    <h4>Direct effects on success</h4><p>${n.outgoing.length?n.outgoing.map(e=>U(e)?w(H(U(e))):w(e)).join(` · `):`No outgoing effects.`}</p>
    ${n.kind===`action`?`<button class="primary wide" id="execute" ${!q()||!r.includes(n.id)?`disabled`:``}>Execute ${w(H(n))} successfully</button><label class="field">Effort basis / evidence<textarea rows="2" data-note="${w(n.id)}" placeholder="Illustrative assumption, source, uncertainty…">${w(e.notes[n.id]??``)}</textarea></label>`:``}</section>`:`<p>Select a node.</p>`}
    <div class="panel-heading"><h2>Execution history</h2><div><button id="undo" ${k.length?``:`disabled`}>Undo</button> <button id="reset">Reset</button></div></div>
    ${k.length?`<ol class="history">${k.map((t,n)=>{let r=b(T,e,k.slice(0,n)),i=b(T,e,k.slice(0,n+1)),a=Pi().filter(e=>i.active.includes(e.id)&&!r.active.includes(e.id)),o=k.slice(0,n+1).every(t=>e.efforts[t])?k.slice(0,n+1).reduce((t,n)=>t+_(e.efforts[n]),0):null;return`<li><strong>${w(H(U(t)))}</strong> <small>${o===null?`effort unset`:y(o)+` `+Ei()+` cumulative`}</small><p>Established: ${a.map(e=>w(H(e))).join(`, `)||`action completion (supports downstream inputs)`}</p></li>`}).join(``)}</ol>`:`<p class="muted">No actions executed. Initial facts are already true.</p>`}
    ${t.active.includes(e.goal)?`<p class="success">✓ The goal holds in this successful execution.</p>`:``}`}function Wi(){let e=W(),t=J(e);return`<h2>Find a feasible attack</h2><p>Search begins from the scenario's initial facts, independently of the manual execution history.</p>
    <label class="field">Your prediction (optional)<textarea id="prediction" rows="2" placeholder="Which route will be cheapest, and why?">${w(e.prediction)}</textarea></label>
    <div class="button-row"><button id="reach" ${q()?``:`disabled`}>Check reachability</button><button id="analyse" class="primary" ${!q()||N?`disabled`:``}>Find minimum effort</button></div>
    ${N?`<p role="status">${w(N)}</p><button id="cancel">Cancel analysis</button>`:``}
    ${t?`<section class="result ${t.status}"><p class="eyebrow">${t.status===`optimal`?`EXACT MINIMUM`:t.status.toUpperCase()}</p><div class="result-number">${t.costMilli===null?t.status===`unreachable`?`Goal unreachable`:`Search incomplete`:y(t.costMilli)+` <small>${w(K())}</small>`}</div><p>${w(t.reason)}</p><p class="muted">${t.sequence.length} actions in witness${Ai()?` · ${t.states} search states explored (not the state-graph size)`:``}</p>${t.sequence.length?`<ol class="witness">${t.sequence.map((n,r)=>`<li>${w(H(U(n)))} <span>${y(t.sequence.slice(0,r+1).reduce((t,n)=>t+_(e.efforts[n]),0))} ${w(Ei())} cumulative</span></li>`).join(``)}</ol><button id="replay-witness">Replay witness on graph</button>`:``}</section>`:`<p class="muted">No current effort result. Review assumptions in Setup, then run the analysis.</p>`}
    <aside class="scope"><h4>What this result means</h4><p>Positive facts persist; each available action succeeds once at most. Efforts add, and shared work is charged once. A result is conditional on these rules and assumptions.</p><p>No probability calculation, retries, failure branches, or claim of real-world security.</p><p>Exact search considers actions upstream of the goal: ≤50,000 states, 5 seconds. There is no separate 20-action cutoff. A limit or cancellation never proves unreachability. Boolean execution and reachability do not use these search limits.</p></aside>${ki()?aa():``}${Oi()?ia():``}`}function Gi(e){let t=[...e.states.filter(e=>!e.goal),...e.states.filter(e=>e.goal)];return new Map(t.map((e,t)=>[e.key,`x${t}`]))}function Ki(e=W()){if(I.compareWith===`none`)return;let t=E.scenarios.find(e=>e.id===I.compareWith);return t?structuredClone(t):ni(T,e)}var qi=()=>{let e=Ki();return e?ri(W(),e):W()};function Ji(){let e=Ki();if(!e)return``;let t=W(),n=ri(t,e),r=n.initialFacts.filter(e=>!t.initialFacts.includes(e)),i=n.entryActions.filter(e=>!t.entryActions.includes(e)),a=[...r.map(e=>`${H(U(e))} (initial fact not held)`),...i.map(e=>`${H(U(e))} (entry not allowed)`),...t.disabled.map(e=>`${H(U(e))} (disabled)`)];return a.length?`<p class="state-withheld"><strong>Withheld in this scenario:</strong> ${a.map(w).join(` · `)}</p>`:``}function Yi(e){let t=qi(),n=[],r=new Set,i=ti(T,t),a=``;for(let o=0;o<=e.length;o++){let s=ii(T,b(T,t,e.slice(0,o)),i);o&&s!==a&&r.add(`${a}>${s}>${e[o-1]}`),s!==n[n.length-1]&&n.push(s),a=s}return{keys:n,edges:r}}var Xi=()=>B?B.seq.slice(0,B.step):k;function Zi(){let e=Q(`states`),t=L.get(e),n=R.get(e);if(n)return{html:`<p class="state-message">${w(n)}</p>`,width:0,height:0};if(!t)return zi(`states`),{html:`<p class="state-message" role="status">Exploring reachable states…</p>`,width:0,height:0};let r=Gi(t),i=Yi(Xi()),a=J(W()),o=a?.sequence.length?Yi(a.sequence).edges:new Set;if(t.states.length>Si){let e=Math.max(...t.layers);return{width:0,height:0,html:`<div class="state-counts"><h3>${t.states.length.toLocaleString(`en`)} states${t.status===`incomplete`?` (incomplete)`:``}</h3><p>${t.edges.length.toLocaleString(`en`)} transitions${Qi(t)} · drawing stops above ${Si} states. The dependency graph has ${T.nodes.length} nodes.</p><table><thead><tr><th>Acquired facts + completions</th><th>States</th><th></th></tr></thead><tbody>${t.layers.map((t,n)=>`<tr><td>${n}</td><td>${t.toLocaleString(`en`)}</td><td><span class="bar" style="width:${Math.max(2,220*t/e)}px"></span></td></tr>`).join(``)}</tbody></table><p class="muted">${w(t.reason)}</p></div>`}}let s=$r(t,{names:r,trace:i.keys,traceEdges:i.edges,current:i.keys[i.keys.length-1],witness:o},e=>H(U(e)),e=>H(U(e)));return{html:s.svg.replace(`<svg `,`<svg style="width:${s.width*A}px;height:${s.height*A}px" `),width:s.width*A,height:s.height*A}}function Qi(e){if(!e.reference)return``;let t=e.edges.filter(e=>e.blocked).length,n=e.states.filter(e=>e.inScenario).length;return t||n<e.states.length?` (${t.toLocaleString(`en`)} blocked in this scenario) · ${n.toLocaleString(`en`)} states reachable in this scenario`:``}function $i(e){let t=I.compareWith===`all`?`all inputs available`:I.compareWith===`none`?`nothing`:`“${E.scenarios.find(e=>e.id===I.compareWith)?.name??`all inputs available`}”`,n=[I.stopAtGoal?`stop at first goal`:`continue past goal`,...I.onlyGoalReaching?[`goal-reaching states only`]:[],`blocked transitions against ${t}`].join(` · `);return`<details class="state-options-box" ${ji?`open`:``}><summary>View options <span class="muted">${w(n)}</span></summary><div class="state-options">${e}</div></details>`}function ea(){if(F!==`states`)return``;let e=L.get(Q(`states`)),t=`<label><input type="checkbox" id="state-stop" ${I.stopAtGoal?`checked`:``}> Stop at the first goal state</label><label><input type="checkbox" id="state-reaching" ${I.onlyGoalReaching?`checked`:``}> Only states that can still reach the goal</label><label>Draw blocked transitions (dashed) against <select id="state-compare"><option value="all" ${I.compareWith===`all`?`selected`:``}>all inputs available</option>${E.scenarios.map(e=>`<option value="${w(e.id)}" ${I.compareWith===e.id?`selected`:``}>scenario “${w(e.name)}”</option>`).join(``)}<option value="none" ${I.compareWith===`none`?`selected`:``}>nothing (this scenario only)</option></select></label>`;if(!e)return`${$i(t)}`;let n=Gi(e),r=Xi(),i=Yi(r).keys,a=r.length?i.map(e=>n.get(e)??`not drawn`).join(` → `):n.get(e.initialKey)??`x0`;return`${$i(t)}<p class="state-stats"><strong>${e.states.length} states</strong> · ${e.edges.length} transitions${Qi(e)} · ${e.states.filter(e=>e.goal).length} goal states${e.status===`incomplete`?` · <em>incomplete</em>`:``}</p>${Ji()}<p class="state-trace" aria-live="polite"><strong>${B?`Animated`:`Executed`} trace:</strong> ${w(a)}${i.some(e=>!n.has(e))?` <span class="muted">(states beyond the first goal state are not drawn while “Stop at the first goal state” is on)</span>`:``}</p>`}function ta(){let e=J(W())?.sequence??[];if(!B&&!k.length&&!e.length)return`<p class="anim-hint muted">Replay: execute actions or find the minimum effort, then replay them here.</p>`;let t=B?.seq.length??0,n=B?B.step===0?`Start: initial facts`:`Step ${B.step} of ${t}: ${H(U(B.seq[B.step-1]))}`:``;return`<div class="anim-bar" role="group" aria-label="Replay an execution"><label>Replay <select id="anim-source"><option value="history" ${bi===`history`?`selected`:``}>current execution (${k.length})</option><option value="witness" ${bi===`witness`?`selected`:``} ${e.length?``:`disabled`}>effort witness (${e.length})</option></select></label>
    <button id="anim-back" aria-label="Previous step" ${!B||B.step===0?`disabled`:``}>◀</button><button id="anim-play" class="${V?`playing`:``}">${V?`❚❚ Pause`:`▶ Play`}</button><button id="anim-forward" aria-label="Next step" ${B&&B.step>=t?`disabled`:``}>▶|</button><button id="anim-stop" ${B?``:`disabled`}>Stop</button>
    <label>Speed <select id="anim-speed">${[.5,1,2].map(e=>`<option value="${e}" ${yi===e?`selected`:``}>${e}×</option>`).join(``)}</select></label><span class="anim-step" aria-live="polite">${w(n)}</span></div>`}function na(e){let t=bi===`witness`?J(W())?.sequence??[]:k;if(!t.length)throw Error(bi===`witness`?`Run Find minimum effort first: there is no witness to replay.`:`Execute some actions first, or choose the effort witness.`);B||={seq:t.slice(),step:0,source:bi},e&&!xi?(V&&clearInterval(V),V=setInterval(()=>{B&&(B.step>=B.seq.length?B.hold?(B.step=0,B.hold=!1):B.hold=!0:B.step++,$())},1300/yi)):e&&(M=`Reduced motion is enabled in your system settings: use the step buttons to move through the execution.`)}var ra={sequences:`Executable sequences: orders of successful actions from the initial state, stopping at the first goal state and never repeating an action that adds no new fact.`,"graph-paths":`Graph paths: simple directed paths in the drawn graph from an initial fact or entry action to the goal, counting actions. AND inputs are not checked (as in exploit-dependency metrics).`,"minimal-attacks":`Minimal attacks: inclusion-minimal sets of available actions that together reach the goal; order ignored. At most 16 relevant actions.`};function ia(){let e=Q(`paths`),t=L.get(e),n=R.get(e),r=z.has(e),i=(e,t=2)=>e===null?`—`:Number.isInteger(e)?String(e):e.toFixed(t);return`<section class="paths"><h2>Count paths and sequences</h2><p class="muted">Path metrics depend on what counts as a path. Choose the convention, then count. Lengths are numbers of actions, not effort.</p><p class="reading">Metrics as in ${w(oi(`paths`))}; graph paths follow that paper's exploit-dependency graphs. Executable sequences and minimal attacks are course conventions.</p>
    <label class="field">Convention<select id="path-convention">${Object.keys(ra).map(e=>`<option value="${e}" ${vi===e?`selected`:``}>${e===`sequences`?`Executable sequences`:e===`graph-paths`?`Graph paths`:`Minimal attacks`}</option>`).join(``)}</select></label>
    <p class="muted">${w(ra[vi])}</p>
    <button id="count-paths" ${!q()||r?`disabled`:``}>${r?`Counting…`:`Count`}</button>
    ${n?`<p class="error">${w(n)}</p>`:``}
    ${t?`<div class="metrics ${t.status}"><p class="eyebrow">${t.status===`complete`?`COMPLETE ENUMERATION`:t.status.toUpperCase()}</p>${t.status===`complete`?`<table><tbody><tr><th>Shortest path (SP)</th><td>${i(t.shortest)}</td></tr><tr><th>Number of paths (NP)</th><td>${t.count.toLocaleString(`en`)}${t.exact?``:` (approximate: exceeds exact integers)`}</td></tr><tr><th>Mean path length (MPL)</th><td>${i(t.mean)}</td></tr><tr><th>Normalised MPL (MPL / NP)</th><td>${i(t.normalisedMean,3)}</td></tr><tr><th>Standard deviation (population)</th><td>${i(t.sd)}</td></tr><tr><th>Mode</th><td>${i(t.mode)}</td></tr><tr><th>Median</th><td>${i(t.median)}</td></tr></tbody></table><p class="muted">Lengths: ${t.histogram.map((e,t)=>e?`${e} × ${t}`:``).filter(Boolean).join(` · `)}</p>${t.examples[0]?`<p class="muted">Example: ${w(t.examples[0].join(` → `)||`(empty)`)}</p>`:``}`:`<p>${w(t.reason)}</p>`}${t.warnings.map(e=>`<p class="warning">⚠ ${w(e)}</p>`).join(``)}</div>`:``}</section>`}function aa(){let e=Q(`metf`),t=L.get(e),n=R.get(e),r=z.has(e),i=J(W());return`<section class="metf"><h2>Mean effort to failure (advanced)</h2><aside class="scope"><h4>Semantics ${w(ci)}</h4><p>Reads each effort as the <em>mean</em> of a random effort (exponential). An attacker without a map of the graph tries every available action at once; the first success decides the next state (total memory). METF is the expected effort until the goal first holds.</p><p>Minimum effort above assumes an attacker who knows the whole graph and takes the cheapest route (the paper's shortest-path measure). Here effort runs on all available actions at once, so METF is never higher than the minimum effort, and lower when routes compete. Not a time to compromise; never combined with probabilities.</p></aside><p class="reading">Measure and attacker models: ${w(oi(`metf`))}. The memoryless attacker is not computed: it needs a single new privilege per step.</p>
    <button id="compute-metf" ${!q()||r?`disabled`:``}>${r?`Computing…`:`Compute METF`}</button>
    ${n?`<p class="error">${w(n)}</p>`:``}
    ${t?`<div class="metrics ${t.status}"><p class="eyebrow">${t.status===`complete`?`EXACT`:t.status.toUpperCase()}</p><table><tbody><tr><th>METF, total-memory attacker</th><td>${t.metf===null?`—`:t.metf.toFixed(3)+` `+w(Ei())}</td></tr><tr><th>Minimum effort (shortest path)</th><td>${i?.costMilli==null?`run Find minimum effort`:y(i.costMilli)+` `+w(Ei())}</td></tr></tbody></table><p class="muted">${w(t.reason)}${t.zeroEffortActions?` ${t.zeroEffortActions} zero-effort action(s) succeed first at no effort.`:``}</p></div>`:``}</section>`}function oa(){let e=W(),t=Q(`probability`),n=L.get(t),r=R.get(t),i=z.has(t),a=e=>e===null?`—`:e.toFixed(4);return`<h2>Probability (advanced)</h2><aside class="scope"><h4>Semantics ${w(o)}</h4><p>Each action with a probability is attempted once when enabled and succeeds independently; blank means certain success. A fact with a prior holds independently with that probability; blank means as in Setup. AND/OR stay deterministic. Pr(goal) is the probability that the successful actions establish the goal.</p><p>Shared causes must be drawn as shared facts. Values derived from CVSS scores are not calibrated probabilities. Probabilities are never combined with effort.</p><p class="reading">Compare: ${w(oi(`probability`))}, whose Bayesian attack graphs use different semantics.</p></aside>
    <h4>Action success probabilities</h4><table class="costs"><thead><tr><th>Action</th><th>Pr(success)</th></tr></thead><tbody>${Y().map(t=>`<tr><th>${w(H(t))}${e.disabled.includes(t.id)?` <small>(unavailable)</small>`:``}</th><td><input class="effort" inputmode="decimal" aria-label="Success probability for ${w(H(t))}" data-prob="${w(t.id)}" value="${w(e.probabilities?.[t.id]??``)}" placeholder="1"></td></tr>`).join(``)}</tbody></table>
    <h4>Uncertain facts and evidence</h4><table class="costs"><thead><tr><th>Fact</th><th>Prior</th><th>Observed</th></tr></thead><tbody>${Pi().map(t=>`<tr><th>${w(H(t))}<small>${e.initialFacts.includes(t.id)?`initially true`:`not initial`}</small></th><td><input class="effort" inputmode="decimal" aria-label="Prior for ${w(H(t))}" data-prior="${w(t.id)}" value="${w(e.priors?.[t.id]??``)}" placeholder="—"></td><td><select aria-label="Evidence for ${w(H(t))}" data-evidence="${w(t.id)}"><option value="">—</option><option value="true" ${e.evidence?.[t.id]===!0?`selected`:``}>true</option><option value="false" ${e.evidence?.[t.id]===!1?`selected`:``}>false</option></select></td></tr>`).join(``)}</tbody></table>
    <div class="button-row"><button id="compute-probability" class="primary" ${!q()||i?`disabled`:``}>${i?`Computing…`:`Compute probability`}</button></div>
    ${r?`<p class="error">${w(r)}</p>`:``}
    ${n?`<section class="result"><p class="eyebrow">${n.method===`exact`?`EXACT`:`MONTE CARLO ESTIMATE`}${n.status===`complete`?``:` · `+n.status.toUpperCase()}</p><div class="result-number">${n.goal===null?`No result`:`Pr(goal${Object.keys(e.evidence??{}).length?` | evidence`:``}) = ${a(n.goal)}`}${n.ciHalfWidth===null?``:` <small>± ${n.ciHalfWidth.toFixed(4)} (95%)</small>`}</div><p>${w(n.reason)}</p>${n.evidenceProbability===null?``:`<p class="muted">Pr(evidence) = ${a(n.evidenceProbability)}</p>`}
      ${n.posteriors.length?`<table class="costs"><thead><tr><th>Fact</th><th>Pr(fact)</th><th>Pr(fact | goal)</th></tr></thead><tbody>${n.posteriors.map(e=>`<tr><th>${w(H(U(e.id)))}</th><td>${a(e.marginal)}</td><td>${a(e.givenGoal)}</td></tr>`).join(``)}</tbody></table>`:``}</section>`:``}`}async function sa(){let e=await c(K(),Di(),ki());return`## Analysis rules\n\nProfile ${e.profile}, engine ${e.engineVersion}, unit ${e.unit}. Rules SHA-256: ${e.sha256}\n\n${e.semantics.map(e=>`- `+e).join(`
`)}\n${e.importDefaults.map(e=>`- `+e).join(`
`)}\n- Limits: ${e.limits.join(`, `)}.\n${e.probabilitySemantics?`- Probability: `+e.probabilitySemantics+`
`:``}${e.metfSemantics?`- Mean effort to failure: `+e.metfSemantics+`
`:``}\n`}function ca(e,t=new Set){let n=U(e);return n?t.has(e)||t.size>8?`(inspect upstream dependency)`:n.kind===`operator`?`(`+n.incoming.map(n=>ca(n,new Set([...t,e]))).join(` ${n.operator} `)+`)`:H(n)+(n.kind===`action`?` completed`:``):`Missing reference`}function la(){return`<details class="rule-summary"><summary>Action rules at a glance</summary><p class="muted">AND requires all inputs; OR requires any input. Executing a rule means assuming its named action succeeds. Incoming-edge choices made in Setup are scenario assumptions.</p><div class="table-scroll"><table><thead><tr><th>Action</th><th>Required condition / completion</th><th>Direct effects or contributions</th></tr></thead><tbody>${Y().map(e=>`<tr><th><button class="text-button" data-node="${w(e.id)}">${w(H(e))}</button><small>…${w(e.id.slice(-8))}</small></th><td>${e.incoming.length?w(e.incoming.map(e=>ca(e)).join(` ${p(e,W())??(e.incoming.length>1?`[UNRESOLVED]`:`AND`)} `)):W().entryActions.includes(e.id)?`Approved entry action`:`Entry assumption not reviewed`}</td><td>${e.outgoing.map(e=>{let t=U(e);return t?t.kind===`operator`?`Input to ${t.operator} (${t.outgoing.map(e=>U(e)?H(U(e)):`missing`).join(`, `)})`:t.kind===`action`?`Prerequisite for `+H(t):H(t):`Missing reference`}).map(w).join(`; `)||`None`}</td></tr>`).join(``)}</tbody></table></div></details>`}function ua(e){let t=E.scenarios[0];if(e.id===t.id)return[`Reference scenario`];let n=[];for(let r of Pi())t.initialFacts.includes(r.id)!==e.initialFacts.includes(r.id)&&n.push(`${H(r)} initially ${e.initialFacts.includes(r.id)?`true`:`not established`}`);t.goal!==e.goal&&e.goal&&n.push(`Goal: ${H(U(e.goal))}`);for(let r of f(T))t.joins?.[r.id]!==e.joins?.[r.id]&&n.push(`${H(r)} inputs: ${t.joins?.[r.id]??`unresolved`} → ${e.joins?.[r.id]??`unresolved`}`);for(let r of Y())t.disabled.includes(r.id)!==e.disabled.includes(r.id)&&n.push(`${H(r)} ${e.disabled.includes(r.id)?`unavailable`:`available`}`),t.entryActions.includes(r.id)!==e.entryActions.includes(r.id)&&n.push(`${H(r)} entry ${e.entryActions.includes(r.id)?`allowed`:`not allowed`}`),(t.efforts[r.id]??``)!==(e.efforts[r.id]??``)&&n.push(`${H(r)} effort ${t.efforts[r.id]||`unset`} → ${e.efforts[r.id]||`unset`} ${Ei()}`);return t.goal&&!e.goal&&n.push(`Goal unset`),n.length?n:[`Same execution assumptions as reference`]}function $(e=!1){let t=document.querySelector(`.graph-scroll`),n=t?.scrollLeft??0,r=t?.scrollTop??0,o=W(),s=Ii(),c=B&&B.step?B.seq[B.step-1]:void 0,l=c?new Set(b(T,o,B.seq.slice(0,B.step)).active.filter(e=>!b(T,o,B.seq.slice(0,B.step-1)).active.includes(e))):void 0,u=Qr(T,o,s,O,H,{stepping:c,fresh:l}),d=F===`states`?Zi():null,p=T.diagnostics.filter(e=>e.level===`error`),m=f(T).filter(e=>!o.joins?.[e.id]);document.querySelector(`#app`).innerHTML=`
  <header class="topbar"><a class="brand" href="#"><span class="brand-mark">↗</span><span>ATTACK GRAPH LAB<small>1DT118 · M1a companion</small></span></a><nav aria-label="Project files"><button id="load-portal">Portal example</button><button id="open-file">Open JSON / project</button><button id="save-project">Save project</button><button id="export-report">Export report</button><a id="open-guide" class="nav-link" href="guide.html" target="_blank" rel="noopener">Guide</a><details class="advanced-menu" ${Mi?`open`:``}><summary>Advanced ▾</summary><div class="menu-pop"><label><input type="checkbox" id="toggle-paths" ${Oi()?`checked`:``}> Path counting</label><label><input type="checkbox" id="toggle-metf" ${ki()?`checked`:``}> Mean effort to failure</label><label><input type="checkbox" id="toggle-diagnostics" ${Ai()?`checked`:``}> Show search effort</label><label><input type="checkbox" id="toggle-probability" ${Di()?`checked`:``}> Probability tab</label><p class="muted">Optional analyses with their own conventions, hidden unless switched on and saved with the project. Path counting and mean effort appear in Analyse.</p></div></details></nav></header>
  <main><div class="intro"><div><p class="eyebrow">BOOLEAN EXECUTION & DETERMINISTIC EFFORT</p><h1>Understand the route.<br>Check every prerequisite.</h1><p>Follow the facts, execute successful actions, and compare what changes.</p></div><aside><span class="local-dot"></span> Runs in your browser<p>Your files stay on this device.<br>No installation or account.</p><a href="https://center-for-threat-informed-defense.github.io/attack-flow/ui/" target="_blank" rel="noopener noreferrer">Author a flow in Attack Flow Builder ↗</a></aside></div>
  <section class="scenario-strip" aria-label="System context">${wi()?`<strong>UNIVERSITY SCENARIO</strong><span>👤 User / help desk</span><b>→</b><span>Login portal / identity provider</span><b>→</b><span>Research data: X's records</span>`:`<strong>IMPORTED MODEL</strong><span>${w(T.name)}</span><span>${T.nodes.length} executable nodes · ${T.contextCount} context objects</span>`}</section>
  <div class="scenario-toolbar"><label>Scenario <select id="scenario">${E.scenarios.map(e=>`<option value="${w(e.id)}" ${e.id===o.id?`selected`:``}>${w(e.name)}</option>`).join(``)}</select></label><input id="variant-name" aria-label="Name for new comparison" placeholder="Name a comparison…"><button id="duplicate">Duplicate current</button>${wi()?`<label>Course intervention <select id="preset"><option value="">Choose…</option>${Object.keys(li.variants).filter(e=>e!==`baseline`).map(e=>`<option value="${e}">${w(e.replaceAll(`_`,` `))}</option>`).join(``)}</select></label>`:``}<span class="save-status">${j?`● Unsaved changes`:`✓ Project ready`} · ${q()?o.reviewed?`assumptions reviewed`:`automatic setup ready`:`review setup`}</span></div>
  <section class="example-library" aria-label="Supplied examples"><div><label for="example-select">Explore an example</label><p class="muted">Load a supplied flow, or use Open JSON / project to import your own file. Save your current project before switching.</p></div><div class="example-controls"><select id="example-select" ${!pi.length||gi?`disabled`:``}><option value="">${w(mi)}</option>${pi.map(e=>`<option value="${w(e.path)}" ${hi===e.path?`selected`:``}>${w(e.title)}</option>`).join(``)}</select><button id="load-example" ${!hi||gi?`disabled`:``}>${gi?`Loading…`:`Load example`}</button></div></section>
  ${M?`<div class="notice" role="status">${w(M)}<button id="dismiss" aria-label="Dismiss message">×</button></div>`:``}
  ${o.automatic?`<aside class="notice automatic-setup"><div><strong>Automatic starting setup — editable assumptions</strong><p>Earliest conditions are true; root actions are enabled. Unlabelled joins use OR; source AND/OR operators are preserved. Missing effort starts at 1 hour per action, for illustration.</p><p><strong>Selected goal:</strong> ${o.goal?w(H(U(o.goal))):`None`}. Chosen as the reachable fact or action farthest downstream by minimum dependency depth. Change these choices in Setup; no personal review is required to try them.</p></div></aside>`:``}
  ${fi?`<div class="previous">Previous project retained in memory. New imports never inherit parameters by name. <button id="restore">Restore previous project</button></div>`:``}
  <details class="import-report" ${p.length||m.length?`open`:``}><summary>${p.length?`⚠ ${p.length} blocking compatibility issue(s) — preview only`:m.length?`⚠ ${m.length} incoming-edge choice(s) required in Setup`:`✓ Import profile checked`} <span>Compatibility with this prototype; not full STIX validation</span></summary>${p.length?`<h3>Blocking compatibility issues</h3><p>Execution and analysis are unavailable. These are prototype limitations or source-structure problems; they do not by themselves mean the Builder file is invalid.</p><ul>${p.map(e=>`<li class="error">${w(e.message)}${e.nodeId?`<code>${w(U(e.nodeId)?.label??e.nodeId)}</code>`:``}</li>`).join(``)}</ul>`:``}${f(T).length?`<h3>Scenario interpretation</h3><ul>${f(T).map(e=>`<li class="review"><strong>${w(H(e))}</strong>: ${o.joins?.[e.id]?`${o.joins[e.id]} scenario interpretation; source unchanged.`:`Choose AND or OR in Setup before execution.`}</li>`).join(``)}</ul>`:``}<h3>Non-blocking notes</h3><ul>${T.diagnostics.filter(e=>e.level===`info`||e.level===`warning`).map(e=>`<li class="${e.level}">${e.level===`warning`?`<strong>Metadata note (does not block execution)</strong> `:``}${w(e.message)}</li>`).join(``)}</ul><p>Profile ${a} · STIX 2.1 / Attack Flow extension 2.0.0 · source SHA-256 <code>${E.sourceSha256}</code></p></details>
  <div class="workspace"><section class="graph-panel"><div class="panel-heading"><div><div class="view-switch" role="group" aria-label="Graph view"><button id="view-dependency" aria-pressed="${F===`dependency`}">Dependency graph</button><button id="view-states" aria-pressed="${F===`states`}">State graph</button></div><p class="muted">${F===`states`?`Each box is a state: the set of facts held (I = initial facts). Each arrow is a successful action. <span class="reading">State graphs: ${w(oi(`stateGraph`))}${I.compareWith===`none`?``:`; blocked transitions: ${w(oi(`blocked`))}`}.</span>`:`Select a node to inspect its inputs and effects.`}</p></div><div class="zoom-controls"><button id="zoom-out" aria-label="Zoom out">−</button><span>${Math.round(A*100)}%</span><button id="zoom-in" aria-label="Zoom in">+</button><button id="fit">Fit</button></div></div>${ta()}${ea()}<div class="graph-scroll" tabindex="0" aria-label="Scrollable graph">${d?`<div class="graph-content" ${d.width?`style="width:${d.width}px;height:${d.height}px"`:``}>${d.html}</div>`:`<div class="graph-content" style="width:${u.width*A}px;height:${u.height*A}px">${u.svg.replace(`<svg `,`<svg style="width:${u.width*A}px;height:${u.height*A}px" `)}</div>`}</div>${d?`<div class="legend"><span>▢ State (facts held)</span><span>→ Successful action</span><span class="yes">Numbered: visited in the trace</span><span class="orange">Gold: goal state</span><span>Faded: cannot reach the goal</span><span>Dashed arrow: blocked in this scenario</span><span>Dashed box: not reachable in this scenario</span><span>Thick green: effort witness</span></div>`:`<div class="legend"><span>▭ Fact</span><span>◯ Action</span><span>◇ AND / OR</span><span class="yes">✓ True / executed</span><span class="orange">◯ Enabled action</span><span>Dashed arrows: prerequisite / effect</span></div>`}<p class="model-caution">System components above provide context. This graph connects facts and actions; every AND input is required.</p></section>
  <section class="control-panel"><div class="tabs" role="tablist" aria-label="Learning workflow">${Ni().map(e=>`<button role="tab" aria-selected="${D===e}" data-tab="${e}">${e===`setup`?`1 · Setup`:e===`execute`?`2 · Execute`:e===`analysis`?`3 · Analyse`:`4 · Probability`}</button>`).join(``)}</div><div class="panel-body" role="tabpanel">${D===`setup`?Hi():D===`execute`?Ui():D===`probability`&&Di()?oa():Wi()}</div></section></div>
  <section class="comparison"><div class="panel-heading"><div><p class="eyebrow">CHANGE ONE ASSUMPTION</p><h2>Compare your scenarios</h2></div><button id="analyse-all" ${!q()||N?`disabled`:``}>Analyse scenarios</button></div><div class="table-scroll"><table><thead><tr><th>Scenario</th><th>Initial facts</th><th>Unavailable actions</th><th>Result</th><th>Successful-action witness</th></tr></thead><tbody>${E.scenarios.map(e=>{let t=J(e);return`<tr class="${o.id===e.id?`current`:``}"><th><button class="text-button" data-scenario="${w(e.id)}">${w(e.name)}</button></th><td>${e.initialFacts.length}</td><td>${e.disabled.map(e=>w(H(U(e)))).join(`, `)||`None`}</td><td>${t?t.status===`optimal`?y(t.costMilli)+` `+Ei():w(t.status):`Not analysed`}</td><td>${t?.sequence.map(e=>w(H(U(e)))).join(` → `)||`—`}</td></tr>`}).join(``)}</tbody></table></div></section>
  ${la()}<footer><span>M1a teaching prototype ${i} · Successful-case model, not an exploitation tool.</span><a href="https://center-for-threat-informed-defense.github.io/attack-flow/language/" target="_blank" rel="noopener noreferrer">Attack Flow language ↗</a><span>Save a project before leaving; browser memory is not a backup.</span></footer></main><input id="file-input" type="file" accept=".json,application/json" hidden>`;let h=document.querySelector(`.graph-scroll`),g=document.querySelectorAll(`.comparison tbody tr`);document.querySelector(`.comparison thead tr`).insertAdjacentHTML(`beforeend`,`<th>Changes vs reference</th>`),g.forEach((e,t)=>{let n=e.insertCell();n.textContent=ua(E.scenarios[t]).join(`; `)});let _=J(o);if(D===`analysis`&&_?.blockedFactIds?.length){let e=document.createElement(`div`);e.className=`blocked-facts`;let t=document.createElement(`h4`);t.textContent=`Facts not derivable under these assumptions`,e.append(t);let n=document.createElement(`p`);n.textContent=_.blockedFactIds.map(e=>H(U(e))).join(` · `),e.append(n),document.querySelector(`.result`)?.append(e)}if(h.scrollLeft=n,h.scrollTop=r,e&&O){let e=document.querySelector(`g[data-node="${CSS.escape(O)}"]`);if(e){let t=e.getBoundingClientRect(),n=h.getBoundingClientRect();h.scrollLeft+=t.left+t.width/2-(n.left+n.width/2),h.scrollTop+=t.top+t.height/2-(n.top+n.height/2)}}}async function da(e){X();try{g(T,e,!0)}catch(e){return M=String(e),$(),null}let t=G(e),n=crypto.randomUUID();return N=`Searching ${e.name}…`,$(),P=new Worker(new URL(new URL(`worker-DZYm4JCr.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),new Promise(r=>{di=r,P.onmessage=i=>{if(i.data.requestId!==n||!E.scenarios.some(n=>n.id===e.id&&G(n)===t))return;if(i.data.states!==void 0){let e=document.querySelector(`[role="status"]`);e&&(e.textContent=`Searching… ${i.data.states} states`);return}let a=i.data.result;a&&_i.set(e.id,{fingerprint:t,result:a}),i.data.error&&(M=i.data.error),P?.terminate(),P=null,N=``,di=null,$(),r(a??null)},P.onerror=e=>{M=`Analysis worker error: ${e.message}`,X(),$()},P.postMessage({requestId:n,model:T,scenario:structuredClone(e)})})}async function fa(e,t=!1){E.view={tab:D,selectedNode:O,zoom:A,history:[...k]};let n=E,r=JSON.parse(e),i=r?.kind===`m1a-companion-project`?await ne(e):await te(e);t&&re(i.model,i.project,li);let a=i.project.view;if(a?.history.length){let e=i.project.scenarios.find(e=>e.id===i.project.selectedScenario);g(i.model,e,!0),b(i.model,e,a.history)}X(),Li(),Z(),L.clear(),R.clear(),fi=n,T=i.model,E=i.project,k=a?.history.slice()??[],_i.clear(),A=a?.zoom??.85,O=a?.selectedNode??ce(T,W(),se(T,W()))[0]??T.nodes.find(e=>e.kind===`action`)?.id??T.nodes[0]?.id??``,D=a?.tab??(t||W().automatic?`execute`:`setup`),j=!r?.kind,M=r?.kind?`Project reopened. Saved manual history was replayed; effort results must be recomputed. Previous project retained in memory.`:W().automatic?`Automatic setup is ready. Execute an enabled action or open Analyse; all defaults can be changed in Setup.`:`Source opened, but automatic setup could not make it runnable. Check compatibility and Setup.`,$(!0)}async function pa(){try{let e=await fetch(new URL(`examples-index.json`,document.baseURI),{cache:`no-store`});if(!e.ok)throw Error(`Example list unavailable`);let t=await e.json();if(!Array.isArray(t)||!t.every(e=>typeof e?.title==`string`&&typeof e?.path==`string`&&/^examples\/[^/]+\.json$/i.test(e.path)&&!decodeURIComponent(e.path.slice(9)).includes(`/`)))throw Error(`Invalid example list`);pi=t,mi=pi.length?`Choose an example…`:`No supplied examples yet`}catch{mi=`Examples unavailable — import your own file`}$()}async function ma(){let e=pi.find(e=>e.path===hi);if(!e||gi)return;let t=E;gi=!0,$();try{let n=await fetch(new URL(e.path,document.baseURI),{cache:`no-store`});if(!n.ok)throw Error(`Could not load ${e.title} (${n.status}).`);let r=await n.text();if(new TextEncoder().encode(r).length>2097152)throw Error(`Example exceeds the 2 MiB import limit.`);E===t&&await fa(r)}catch(e){M=`Example could not be opened. ${e instanceof Error?e.message:String(e)}`}finally{gi=!1,$()}}async function ha(){E.view={tab:D,selectedNode:O,zoom:A,history:[...k]},E.rules=await c(K(),Di(),ki());let e=structuredClone(E),t=E.scenarios.map(e=>({id:e.id,key:G(e),result:J(e)})).filter(e=>e.result);e.resultSnapshots=Object.fromEntries(await Promise.all(t.map(async e=>[e.id,{engineVersion:i,configurationSha256:await ee(e.key),result:e.result}]))),Bi(`attack-graph-project.json`,JSON.stringify(e,null,2)),j=!1,M=`Project downloaded with assumptions, result snapshots and the current execution history. Reopened results are recomputed, not trusted from snapshots.`,$()}async function ga(){let e=structuredClone(E),t=e=>e.replaceAll(`
`,` `).replaceAll(`|`,`\\|`),n=`# Attack Graph Lab report\n\nApplication: ${i}\nExecution profile: ${a}\nSource SHA-256: ${e.sourceSha256}\n\nUnits: ${K()}. Successful-case, positive, once-only action model.\n\n${await sa()}`;for(let r of e.scenarios){let e=J(r);n+=`Setup mode: ${r.automatic?`Automatic starting assumptions (editable); personal review: `+r.reviewed:`Manual / prepared`}\n\nIncoming-edge interpretations for ${t(r.name)}:\n${f(T).map(e=>`- ${t(H(e))} (${e.id}): ${r.joins?.[e.id]??`UNRESOLVED`}; inputs: ${e.incoming.map(e=>t(H(U(e)))+` (`+e+`)`).join(`; `)}`).join(`
`)||`None required.`}\n\n`,n+=`## ${t(r.name)}\n\nConfiguration SHA-256: ${await ee(G(r))}\nReviewed: ${r.reviewed}\nGoal: ${r.goal?t(H(U(r.goal)))+` (`+r.goal+`)`:`Not set`}\n\nAssumptions: ${r.assumptions}\n\nInitial facts:\n${r.initialFacts.map(e=>`- `+t(H(U(e)))+` (`+e+`)`).join(`
`)}\n\nApproved entry actions: ${r.entryActions.join(`, `)||`None`}\n\n| Action | ID | ${K()} | Available | Basis |\n| --- | --- | ---: | --- | --- |\n${Y().map(e=>`| ${t(H(e))} | ${e.id} | ${r.efforts[e.id]??`unset`} | ${!r.disabled.includes(e.id)} | ${t(r.notes[e.id]??`Not provided`)} |`).join(`
`)}\n\nPrediction: ${r.prediction??`Not recorded`}\n\nResult: ${e?e.status+(e.costMilli===null?``:`, `+y(e.costMilli)+` h`):`Not analysed; stored results are not trusted on project reopen.`}\n${e?e.reason+`

Witness: `+(e.sequence.map(e=>H(U(e))+` (`+e+`)`).join(` → `)||`None`):``}\n\n`}let r=L.get(Q(`paths`));r&&(n+=`## Path metrics (${t(W().name)})\n\nConvention: ${ra[r.convention]}\n\nStatus: ${r.status}. NP ${r.count}; SP ${r.shortest??`—`}; MPL ${r.mean?.toFixed(3)??`—`}; NMPL ${r.normalisedMean?.toFixed(3)??`—`}; SD ${r.sd?.toFixed(3)??`—`}; mode ${r.mode??`—`}; median ${r.median??`—`}.\n${r.warnings.map(e=>`- `+t(e)).join(`
`)}\n\n`);for(let r of e.scenarios){let e=L.get(Q(`metf`,r));e&&(n+=`## Mean effort to failure (${t(r.name)})\n\nSemantics: ${ci}. Status: ${e.status}. METF (total memory) = ${e.metf===null?`—`:e.metf.toFixed(3)+` `+K()}; minimum effort (shortest path) = ${J(r)?.costMilli==null?`not analysed`:y(J(r).costMilli)+` `+K()}.\n\n`)}for(let r of e.scenarios){let e=L.get(Q(`probability`,r));e&&e.goal!==null&&(n+=`## Probability (${t(r.name)})\n\nSemantics: ${o}. Method: ${e.method}. Pr(goal${Object.keys(r.evidence??{}).length?` | evidence`:``}) = ${e.goal.toFixed(4)}${e.ciHalfWidth===null?``:` ± `+e.ciHalfWidth.toFixed(4)+` (95%)`}.\nProbabilities: ${Object.entries(r.probabilities??{}).map(([e,n])=>t(H(U(e)))+` `+n).join(`; `)||`none`}. Priors: ${Object.entries(r.priors??{}).map(([e,n])=>t(H(U(e)))+` `+n).join(`; `)||`none`}. Evidence: ${Object.entries(r.evidence??{}).map(([e,n])=>t(H(U(e)))+` = `+n).join(`; `)||`none`}.\n\n`)}let s=[`stateGraph`,`blocked`,...r?[`paths`]:[],...ki()?[`metf`]:[],...Di()?[`probability`]:[]];n+=`## Readings for the conventions used\n\nPointers only; the analysis rules above define the results.\n\n${si(s)}\n\n`,n+=`## Limits

The effort analysis does not model failure branches, retries or probabilities. STIX confidence is not success probability. Unreachability is conditional on the supplied model. Resource-limited searches are incomplete.
`,Bi(`attack-graph-report.md`,n,`text/markdown`)}document.addEventListener(`click`,async t=>{let n=t.target.closest(`button,[data-node]`);if(n)try{if(n.dataset.node){O=n.dataset.node,D=`execute`,$(!0);return}if(n.dataset.tab){D=n.dataset.tab,$();return}if(n.dataset.scenario){X(),Z(),E.selectedScenario=n.dataset.scenario,k=[],$();return}switch(n.id){case`load-portal`:await fa(e,!0);break;case`open-file`:document.querySelector(`#file-input`).click();break;case`load-example`:await ma();break;case`save-project`:await ha();break;case`export-report`:await ga();break;case`execute`:Z(),g(T,W(),!0),k=le(T,W(),Fi(),O).history,M=`Successful effect applied. This step does not estimate success probability.`,$();break;case`undo`:Z(),k.pop(),$();break;case`reset`:Z(),k=[],$();break;case`analyse`:D=`analysis`,await da(W());break;case`analyse-all`:for(let e of[...E.scenarios]){try{g(T,e,!0)}catch{continue}if(!await da(e))break}break;case`reach`:M=de(T,W())?`Goal reachable under the successful-action assumptions. Minimum effort has not been calculated by this check.`:`Goal unreachable under these rules and initial facts.`,$();break;case`cancel`:X(),M=`Analysis cancelled. No new minimum or unreachability conclusion was established.`,$();break;case`replay-witness`:Z(),k=J(W())?.sequence.slice()??[],D=`execute`,$();break;case`zoom-in`:A=Math.min(2,A+.15),$();break;case`zoom-out`:A=Math.max(.2,A-.15),$();break;case`fit`:{let e=document.querySelector(`.graph-scroll`).clientWidth,t=L.get(Q(`states`)),n=F===`states`&&t&&t.states.length<=Si?$r(t,{names:new Map,trace:[],traceEdges:new Set,witness:new Set},e=>e,e=>e).width:Qr(T,W(),Fi(),O,H).width;A=Math.max(.2,Math.min(1,(e-24)/n)),$();break}case`view-dependency`:F=`dependency`,$();break;case`view-states`:F=`states`,$();break;case`anim-play`:V?(clearInterval(V),V=void 0):na(!0),$();break;case`anim-forward`:na(!1),V&&=(clearInterval(V),void 0),B.step=Math.min(B.seq.length,B.step+1),$();break;case`anim-back`:B&&(V&&=(clearInterval(V),void 0),B.step=Math.max(0,B.step-1)),$();break;case`anim-stop`:Z(),$();break;case`count-paths`:zi(`paths`),$();break;case`compute-metf`:zi(`metf`),$();break;case`compute-probability`:zi(`probability`),$();break;case`dismiss`:M=``,$();break;case`duplicate`:{if(E.scenarios.length>=50)throw Error(`At most 50 scenarios per project.`);let e=structuredClone(W());e.id=crypto.randomUUID(),e.name=document.querySelector(`#variant-name`).value.trim()||`Comparison ${E.scenarios.length}`,X(),E.scenarios.push(e),E.selectedScenario=e.id,k=[],j=!0,M=`Independent comparison created. Changes here leave the original scenario intact.`,$();break}case`restore`:if(fi){let e=fi;fi=null,await fa(JSON.stringify(e)),fi=null,M=`Previous project restored.`,$()}}}catch(e){M=e instanceof Error?e.message:String(e),$()}}),document.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&e.target.matches(`g[data-node]`)&&(e.preventDefault(),O=e.target.dataset.node,D=`execute`,$(!0))}),document.addEventListener(`click`,e=>{let t=e.target,n=t.closest?.(`summary`)?.parentElement;n?.classList.contains(`state-options-box`)&&(ji=!n.open),n?.classList.contains(`advanced-menu`)?Mi=!n.open:Mi&&!t.closest?.(`.advanced-menu`)&&(Mi=!1,document.querySelector(`.advanced-menu`)?.removeAttribute(`open`))},!0),document.addEventListener(`change`,async e=>{let t=e.target;try{if(t.id===`file-input`){let e=t.files?.[0];if(!e)return;if(e.size>12582912)throw Error(`File exceeds the 12 MiB project limit.`);await fa(await e.text());return}if(t.id===`example-select`){hi=t.value,$();return}if(t.id===`toggle-metf`||t.id===`toggle-diagnostics`){E.advanced={...E.advanced,[t.id===`toggle-metf`?`metf`:`diagnostics`]:t.checked},t.checked&&(D=`analysis`),j=!0,$();return}if(t.id===`toggle-paths`){E.advanced={...E.advanced,paths:t.checked},t.checked&&(D=`analysis`),j=!0,$();return}if(t.id===`toggle-probability`){E.advanced={...E.advanced,probability:t.checked},!t.checked&&D===`probability`&&(D=`analysis`),t.checked&&(D=`probability`),j=!0,$();return}if(t.id===`state-stop`||t.id===`state-reaching`){I[t.id===`state-stop`?`stopAtGoal`:`onlyGoalReaching`]=t.checked,$();return}if(t.id===`state-compare`){I.compareWith=t.value,$();return}if(t.id===`path-convention`){vi=t.value,$();return}if(t.id===`anim-source`){Z(),bi=t.value,$();return}if(t.id===`anim-speed`){yi=Number(t.value),V&&(clearInterval(V),V=void 0,na(!0)),$();return}if(t.id===`scenario`){X(),Z(),E.selectedScenario=t.value,k=[],$();return}if(t.id===`preset`&&t.value){if(E.scenarios.length>=50)throw Error(`At most 50 scenarios per project.`);let e=ie(T,E.scenarios[0],li,t.value);X(),E.scenarios.push(e),E.selectedScenario=e.id,k=[],j=!0,M=`Created ${e.name} from the first scenario. Check its changed assumptions in Setup.`,$();return}let e=W(),n=(t,n,r)=>{e[t]=r?[...new Set([...e[t],n])]:e[t].filter(e=>e!==n)};if(t.dataset.initial)n(`initialFacts`,t.dataset.initial,t.checked);else if(t.dataset.entry)n(`entryActions`,t.dataset.entry,t.checked);else if(t.dataset.available)n(`disabled`,t.dataset.available,!t.checked);else if(t.dataset.join)e.joins??={},t.value===`AND`||t.value===`OR`?e.joins[t.dataset.join]=t.value:delete e.joins[t.dataset.join],e.reviewed=!1;else if(t.dataset.effort)t.value.trim()&&_(t.value),e.efforts[t.dataset.effort]=t.value.trim();else if(t.dataset.prob!==void 0||t.dataset.prior!==void 0||t.dataset.evidence!==void 0){let n=t.dataset.prob??t.dataset.prior??t.dataset.evidence,r=t.value.trim();if(t.dataset.evidence!==void 0)e.evidence??={},r===``?delete e.evidence[n]:e.evidence[n]=r===`true`;else{let i=t.dataset.prob===void 0?`priors`:`probabilities`;r&&v(r),e[i]??={},r?e[i][n]=r:delete e[i][n]}j=!0,$();return}else if(t.dataset.note){e.notes[t.dataset.note]=t.value,j=!0,$();return}else if(t.id===`goal`)e.goal=t.value;else if(t.id===`reviewed`)e.reviewed=t.checked;else if(t.id===`assumptions`){e.assumptions=t.value,j=!0,$();return}else if(t.id===`prediction`){e.prediction=t.value,j=!0,$();return}else return;Ri(),$()}catch(e){M=e instanceof Error?e.message:String(e),$()}}),window.addEventListener(`beforeunload`,e=>{j&&(e.preventDefault(),e.returnValue=``)}),$(!0),pa();