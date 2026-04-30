
// 포켓몬 타입
export interface PokemonType {
  id: number;
  slot: number;
  name: string;
  color: string;
  sprite?: string;
}

// 포켓몬 특성
export interface Ability {
  id: number;
  name: string;
  description: string;
  isHidden: boolean;
  slot: number;
}

// 타입 상성 배율
export interface TypeEfficacy {
  [key: string]: {
    id: number;
    name: string;
    factor: number;
    color: string;
  }[];
}

 // 포켓몬 리스트
 export interface PokemonListData {
  id: number;
  pokemonSpeciesId: number;
  name: string;
  generation: number;
  formType?: string;
  types: PokemonType[];
  legendary: boolean;
  mythical: boolean;
}

// 포켓몬 폼 상세 정보
export interface PokemonFormData {
  id: number;
  name: string;
  formGroup: string;
  formType: string;
  formName: string | null;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    total: number;
  };
  height: number;
  weight: number;
  description: string | null;
  types: PokemonType[];
  abilities: Ability[];
  typeEfficacy: TypeEfficacy; 
}

// 포켓몬 해당 종 상세 정보 리스트
export interface PokemonDetailListData {
  speciesId: number;
  name: string;
  gender: {
    male: number;
    female: number;
    genderless: boolean;
  };
  category: string;
  prev: { id: number; name: string }; 
  next: { id: number; name: string };
  eggGroups: string[];
  forms: PokemonFormData[];
}

export const mockData : PokemonDetailListData =
{
  "speciesId": 6,
  "name": "리자몽",
  "gender": {
    "male": 87.5,
    "female": 12.5,
    "genderless": false
  },
  "category": "화염포켓몬",
  "eggGroups": [
    "괴수",
    "드래곤"
  ],
  "prev": {
    "id": 5,
    "name": "리자드"
  },
  "next": {
    "id": 7,
    "name": "꼬부기"
  },
  "forms": [
    {
      "id": 6,
      "name": "리자몽",
      "formGroup": "standard",
      "formType": "default",
      "formName": null,
      "stats": {
        "hp": 78,
        "attack": 84,
        "defense": 78,
        "specialAttack": 109,
        "specialDefense": 85,
        "speed": 100,
        "total": 534
      },
      "height": 17,
      "weight": 905,
      "description": "입에서 작렬하는 불꽃을\n토해낼 때 꼬리의 끝이\n더욱 붉고 격렬하게 타오른다.",
      "types": [
        {
          "id": 10,
          "name": "불꽃",
          "color": "#F08030",
          "slot": 1
        },
        {
          "id": 3,
          "name": "비행",
          "color": "#A2C3E7",
          "slot": 2
        }
      ],
      "abilities": [
        {
          "id": 66,
          "name": "맹화",
          "description": "HP가 줄었을 때\n불꽃타입 기술의\n위력이 올라간다.",
          "isHidden": false,
          "slot": 1
        },
        {
          "id": 94,
          "name": "선파워",
          "description": "날씨가 맑으면\n특수공격이 올라가지만\n매 턴 HP가 줄어든다.",
          "isHidden": true,
          "slot": 3
        }
      ],
      "typeEfficacy": {
        "1.0": [
          { "id": 1, "name": "노말", "factor": 1.0, "color": "#949495" },
          { "id": 3, "name": "비행", "factor": 1.0, "color": "#A2C3E7" },
          { "id": 4, "name": "독", "factor": 1.0, "color": "#735198" },
          { "id": 8, "name": "고스트", "factor": 1.0, "color": "#684870" },
          { "id": 14, "name": "에스퍼", "factor": 1.0, "color": "#DD6B7B" },
          { "id": 15, "name": "얼음", "factor": 1.0, "color": "#6DC8EB" },
          { "id": 16, "name": "드래곤", "factor": 1.0, "color": "#535CA8" },
          { "id": 17, "name": "악", "factor": 1.0, "color": "#4C4948" }
        ],
        "0.5": [
          { "id": 2, "name": "격투", "factor": 0.5, "color": "#E09C40" },
          { "id": 9, "name": "강철", "factor": 0.5, "color": "#69A9C7" },
          { "id": 10, "name": "불꽃", "factor": 0.5, "color": "#F08030" },
          { "id": 18, "name": "페어리", "factor": 0.5, "color": "#DAB4D4" }
        ],
        "0.0": [
          { "id": 5, "name": "땅", "factor": 0.0, "color": "#9C7743" }
        ],
        "4.0": [
          { "id": 6, "name": "바위", "factor": 4.0, "color": "#BFB889" }
        ],
        "0.25": [
          { "id": 7, "name": "벌레", "factor": 0.25, "color": "#9FA244" },
          { "id": 12, "name": "풀", "factor": 0.25, "color": "#66A945" }
        ],
        "2.0": [
          { "id": 11, "name": "물", "factor": 2.0, "color": "#5185C5" },
          { "id": 13, "name": "전기", "factor": 2.0, "color": "#FBB917" }
        ]
      }
    },
    {
                "id": 10034,
                "name": "리자몽",
                "formGroup": "special",
                "formType": "megax",
                "formName": "메가리자몽X",
                "stats": {
                    "hp": 78,
                    "attack": 130,
                    "defense": 111,
                    "specialAttack": 130,
                    "specialDefense": 85,
                    "speed": 100,
                    "total": 634
                },
                "height": 17,
                "weight": 1105,
                "description": "온몸에 넘치는 엄청난 파워가 몸을 검게 물들이고 푸른 불꽃을 이글이글 태운다.",
                "types": [
                    {
                        "id": 10,
                        "name": "불꽃",
                        "color": "#F08030",
                        "slot": 1
                    },
                    {
                        "id": 16,
                        "name": "드래곤",
                        "color": "#535CA8",
                        "slot": 2
                    }
                ],
                "abilities": [
                    {
                        "id": 181,
                        "name": "단단한발톱",
                        "description": "상대에게 접촉하는 기술의\n위력이 올라간다.",
                        "isHidden": false,
                        "slot": 1
                    }
                ],
                "typeEfficacy": {
                    "1.0": [
                        {
                            "id": 1,
                            "name": "노말",
                            "factor": 1.0,
                            "color": "#949495"
                        },
                        {
                            "id": 2,
                            "name": "격투",
                            "factor": 1.0,
                            "color": "#E09C40"
                        },
                        {
                            "id": 3,
                            "name": "비행",
                            "factor": 1.0,
                            "color": "#A2C3E7"
                        },
                        {
                            "id": 4,
                            "name": "독",
                            "factor": 1.0,
                            "color": "#735198"
                        },
                        {
                            "id": 8,
                            "name": "고스트",
                            "factor": 1.0,
                            "color": "#684870"
                        },
                        {
                            "id": 11,
                            "name": "물",
                            "factor": 1.0,
                            "color": "#5185C5"
                        },
                        {
                            "id": 14,
                            "name": "에스퍼",
                            "factor": 1.0,
                            "color": "#DD6B7B"
                        },
                        {
                            "id": 15,
                            "name": "얼음",
                            "factor": 1.0,
                            "color": "#6DC8EB"
                        },
                        {
                            "id": 17,
                            "name": "악",
                            "factor": 1.0,
                            "color": "#4C4948"
                        },
                        {
                            "id": 18,
                            "name": "페어리",
                            "factor": 1.0,
                            "color": "#DAB4D4"
                        }
                    ],
                    "2.0": [
                        {
                            "id": 5,
                            "name": "땅",
                            "factor": 2.0,
                            "color": "#9C7743"
                        },
                        {
                            "id": 6,
                            "name": "바위",
                            "factor": 2.0,
                            "color": "#BFB889"
                        },
                        {
                            "id": 16,
                            "name": "드래곤",
                            "factor": 2.0,
                            "color": "#535CA8"
                        }
                    ],
                    "0.5": [
                        {
                            "id": 7,
                            "name": "벌레",
                            "factor": 0.5,
                            "color": "#9FA244"
                        },
                        {
                            "id": 9,
                            "name": "강철",
                            "factor": 0.5,
                            "color": "#69A9C7"
                        },
                        {
                            "id": 13,
                            "name": "전기",
                            "factor": 0.5,
                            "color": "#FBB917"
                        }
                    ],
                    "0.25": [
                        {
                            "id": 10,
                            "name": "불꽃",
                            "factor": 0.25,
                            "color": "#F08030"
                        },
                        {
                            "id": 12,
                            "name": "풀",
                            "factor": 0.25,
                            "color": "#66A945"
                        }
                    ]
                }
            },
            {
                "id": 10035,
                "name": "리자몽",
                "formGroup": "special",
                "formType": "megay",
                "formName": "메가리자몽Y",
                "stats": {
                    "hp": 78,
                    "attack": 104,
                    "defense": 78,
                    "specialAttack": 159,
                    "specialDefense": 115,
                    "speed": 100,
                    "total": 634
                },
                "height": 17,
                "weight": 1005,
                "description": "트레이너와의 유대가 힘의 원천이다. 제트기를 능가하는 비행 능력을 자랑한다.",
                "types": [
                    {
                        "id": 10,
                        "name": "불꽃",
                        "color": "#F08030",
                        "slot": 1
                    },
                    {
                        "id": 3,
                        "name": "비행",
                        "color": "#A2C3E7",
                        "slot": 2
                    }
                ],
                "abilities": [
                    {
                        "id": 70,
                        "name": "가뭄",
                        "description": "등장했을 때\n날씨를 맑음으로 만든다.",
                        "isHidden": false,
                        "slot": 1
                    }
                ],
                "typeEfficacy": {
                    "1.0": [
                        {
                            "id": 1,
                            "name": "노말",
                            "factor": 1.0,
                            "color": "#949495"
                        },
                        {
                            "id": 3,
                            "name": "비행",
                            "factor": 1.0,
                            "color": "#A2C3E7"
                        },
                        {
                            "id": 4,
                            "name": "독",
                            "factor": 1.0,
                            "color": "#735198"
                        },
                        {
                            "id": 8,
                            "name": "고스트",
                            "factor": 1.0,
                            "color": "#684870"
                        },
                        {
                            "id": 14,
                            "name": "에스퍼",
                            "factor": 1.0,
                            "color": "#DD6B7B"
                        },
                        {
                            "id": 15,
                            "name": "얼음",
                            "factor": 1.0,
                            "color": "#6DC8EB"
                        },
                        {
                            "id": 16,
                            "name": "드래곤",
                            "factor": 1.0,
                            "color": "#535CA8"
                        },
                        {
                            "id": 17,
                            "name": "악",
                            "factor": 1.0,
                            "color": "#4C4948"
                        }
                    ],
                    "0.5": [
                        {
                            "id": 2,
                            "name": "격투",
                            "factor": 0.5,
                            "color": "#E09C40"
                        },
                        {
                            "id": 9,
                            "name": "강철",
                            "factor": 0.5,
                            "color": "#69A9C7"
                        },
                        {
                            "id": 10,
                            "name": "불꽃",
                            "factor": 0.5,
                            "color": "#F08030"
                        },
                        {
                            "id": 18,
                            "name": "페어리",
                            "factor": 0.5,
                            "color": "#DAB4D4"
                        }
                    ],
                    "0.0": [
                        {
                            "id": 5,
                            "name": "땅",
                            "factor": 0.0,
                            "color": "#9C7743"
                        }
                    ],
                    "4.0": [
                        {
                            "id": 6,
                            "name": "바위",
                            "factor": 4.0,
                            "color": "#BFB889"
                        }
                    ],
                    "0.25": [
                        {
                            "id": 7,
                            "name": "벌레",
                            "factor": 0.25,
                            "color": "#9FA244"
                        },
                        {
                            "id": 12,
                            "name": "풀",
                            "factor": 0.25,
                            "color": "#66A945"
                        }
                    ],
                    "2.0": [
                        {
                            "id": 11,
                            "name": "물",
                            "factor": 2.0,
                            "color": "#5185C5"
                        },
                        {
                            "id": 13,
                            "name": "전기",
                            "factor": 2.0,
                            "color": "#FBB917"
                        }
                    ]
                }
            },
            {
                "id": 10196,
                "name": "리자몽",
                "formGroup": "regional",
                "formType": "alora",
                "formName": "알로라의 모습",
                "stats": {
                    "hp": 78,
                    "attack": 84,
                    "defense": 78,
                    "specialAttack": 109,
                    "specialDefense": 85,
                    "speed": 100,
                    "total": 534
                },
                "height": 280,
                "weight": 10000,
                "description": null,
                "types": [
                    {
                        "id": 10,
                        "name": "불꽃",
                        "color": "#F08030",
                        "slot": 1
                    },
                    {
                        "id": 3,
                        "name": "비행",
                        "color": "#A2C3E7",
                        "slot": 2
                    }
                ],
                "abilities": [
                    {
                        "id": 66,
                        "name": "맹화",
                        "description": "HP가 줄었을 때\n불꽃타입 기술의\n위력이 올라간다.",
                        "isHidden": false,
                        "slot": 1
                    },
                    {
                        "id": 94,
                        "name": "선파워",
                        "description": "날씨가 맑으면\n특수공격이 올라가지만\n매 턴 HP가 줄어든다.",
                        "isHidden": true,
                        "slot": 3
                    }
                ],
                "typeEfficacy": {
                    "1.0": [
                        {
                            "id": 1,
                            "name": "노말",
                            "factor": 1.0,
                            "color": "#949495"
                        },
                        {
                            "id": 3,
                            "name": "비행",
                            "factor": 1.0,
                            "color": "#A2C3E7"
                        },
                        {
                            "id": 4,
                            "name": "독",
                            "factor": 1.0,
                            "color": "#735198"
                        },
                        {
                            "id": 8,
                            "name": "고스트",
                            "factor": 1.0,
                            "color": "#684870"
                        },
                        {
                            "id": 14,
                            "name": "에스퍼",
                            "factor": 1.0,
                            "color": "#DD6B7B"
                        },
                        {
                            "id": 15,
                            "name": "얼음",
                            "factor": 1.0,
                            "color": "#6DC8EB"
                        },
                        {
                            "id": 16,
                            "name": "드래곤",
                            "factor": 1.0,
                            "color": "#535CA8"
                        },
                        {
                            "id": 17,
                            "name": "악",
                            "factor": 1.0,
                            "color": "#4C4948"
                        }
                    ],
                    "0.5": [
                        {
                            "id": 2,
                            "name": "격투",
                            "factor": 0.5,
                            "color": "#E09C40"
                        },
                        {
                            "id": 9,
                            "name": "강철",
                            "factor": 0.5,
                            "color": "#69A9C7"
                        },
                        {
                            "id": 10,
                            "name": "불꽃",
                            "factor": 0.5,
                            "color": "#F08030"
                        },
                        {
                            "id": 18,
                            "name": "페어리",
                            "factor": 0.5,
                            "color": "#DAB4D4"
                        }
                    ],
                    "0.0": [
                        {
                            "id": 5,
                            "name": "땅",
                            "factor": 0.0,
                            "color": "#9C7743"
                        }
                    ],
                    "4.0": [
                        {
                            "id": 6,
                            "name": "바위",
                            "factor": 4.0,
                            "color": "#BFB889"
                        }
                    ],
                    "0.25": [
                        {
                            "id": 7,
                            "name": "벌레",
                            "factor": 0.25,
                            "color": "#9FA244"
                        },
                        {
                            "id": 12,
                            "name": "풀",
                            "factor": 0.25,
                            "color": "#66A945"
                        }
                    ],
                    "2.0": [
                        {
                            "id": 11,
                            "name": "물",
                            "factor": 2.0,
                            "color": "#5185C5"
                        },
                        {
                            "id": 13,
                            "name": "전기",
                            "factor": 2.0,
                            "color": "#FBB917"
                        }
                    ]
                }
            }
  ]
}
  
