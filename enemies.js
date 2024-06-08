const enemies = {
            // Slimes
            'Anemo Slime': { Physical: 10, Anemo: 100, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Hydro%2520Slime_icon.png'  },
            'Cryo Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 100, Dendro: 10, advantage: ['Freeze'], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Cryo%2520Slime_icon.png'  },
            'Dendro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 100, advantage: [], disadvantage: ['Burnt', 'Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Dendro%2520Slime_icon.png'  },
            'Electro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 100, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Electro%2520Slime_icon.png'  },
            'Geo Slime': { Physical: 10, Anemo: 10, Geo: 100, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Geo%2520Slime_icon.png'  },
            'Hydro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 100, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Hydro%2520Slime_icon.png'  },
            'Pyro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 100, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/04/15/35428890/c7fb92fd449e65929287ca9ead3b4bc7_4889858592179076009.png?x-oss-process=image%2Fformat%2Cwebp'  },
            'Large Anemo Slime': { Physical: 10, Anemo: 100, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Large%2520Anemo%2520Slime_icon.png'  },
            'Large Cryo Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 100, Dendro: 10, advantage: ['Freeze'], disadvantage: ['Cryo Shield'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Large%2520Cryo%2520Slime_icon.png'  },
            'Large Dendro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 100, advantage: [], disadvantage: ['Burnt'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Large%2520Dendro%2520Slime_icon.png'  },
            'Large Electro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 100, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Large%2520Electro%2520Slime_icon.png'  },
            'Mutant Electro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 100, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Mutant%2520Electro%2520Slime_icon.png'  },
            'Large Geo Slime': { Physical: 10, Anemo: 10, Geo: 100, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Geo Shield'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Large%2520Geo%2520Slime_icon.png'  },
            'Large Hydro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 100, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Large%2520Hydro%2520Slime_icon.png'  },
            'Large Pyro Slime': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 100, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/04/15/35428890/629ff248133db49d140e9bec1f3a5bb9_7732094270515983803.png?x-oss-process=image%2Fformat%2Cwebp'  },
            // Hilichurls
            'Hilichurl': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Rock%2520Shield%2520Hilichurl%2520Guard_icon.png'  },
            'Anemo Samachurl': { Physical: 10, Anemo: 50, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Anemo%2520Samachurl_icon.png'  },
            'Anemo Hilichurl Rogue': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/04/10/35428890/eb2ff17818f8f4420f9033724d997ea1_6221977951827695686.png?x-oss-process=image%2Fformat%2Cwebp'  },
            'Cryo Samachurl': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 50, Dendro: 10, advantage: [], disadvantage: ['Cryo Shield', 'Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Cryo%2520Samachurl_icon.png'  },
            'Ice Shield Hilichurl Guard': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Cryo Shield', 'Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Ice%2520Shield%2520Hilichurl%2520Guard_icon.png'  },
            'Frostarm Lawachurl': { Physical: 50, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 70, Dendro: 10, advantage: [], disadvantage: ['Cryo Shield'], imgUrl: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/04/15/35428890/a9d0ba2233b2744eb97cb16fb68e8210_4146185776549822137.png?x-oss-process=image%2Fformat%2Cwebp'  },
            'Ice Shieldwall Mitachurl': { Physical: 30, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Cryo Shield'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Ice%2520Shieldwall%2520Mitachurl_icon.png'  },
            'Dendro Samachurl': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 50, advantage: [], disadvantage: ['Dendro Shield', 'Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Dendro%2520Samachurl_icon.png'  },
            'Wooden Shield Hilichurl Guard': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Dendro Shield', 'Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Wooden%2520Shield%2520Hilichurl%2520Guard_icon.png'  },
            'Wooden Shieldwall Mitachurl': { Physical: 30, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Dendro Shield',], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Wooden%2520Shieldwall%2520Mitachurl_icon.png'  },
            'Electro Samachurl': { Physical: 10, Anemo: 10, Geo: 10, Electro: 50, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Electro%2520Samachurl_icon.png'  },
            'Crackling Axe Mitachurl': { Physical: 30, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Crackling%2520Axe%2520Mitachurl_icon.png'  },
            'Thunderhelm Lawachurl': { Physical: 50, Anemo: 10, Geo: 10, Electro: 70, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Electro Shield'], imgUrl: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/04/15/35428890/c0b9fccb976922890793a88cefa44525_1236045065062849867.png?x-oss-process=image%2Fformat%2Cwebp'  },
            'Geo Samachurl': { Physical: 10, Anemo: 10, Geo: 50, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Geo Shield', 'Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Geo%2520Samachurl_icon.png'  },
            'Rock Shield Hilichurl Guard': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Geo Shield', 'Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Rock%2520Shield%2520Hilichurl%2520Guard_icon.png'  },
            'Rock Shieldwall Mitachurl': { Physical: 30, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Geo Shield'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Rock%2520Shieldwall%2520Mitachurl_icon.png'  },
            'Stonehide Lawachurl': { Physical: 50, Anemo: 10, Geo: 70, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Geo Shield'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Stonehide%2520Lawachurl_icon.png'  },
            'Hydro Samachurl': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 50, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Crowd Control'], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Hydro%2520Samachurl_icon.png'  },
            'Hydro Hilichurl Rogue': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 50, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Hydro Shield'], imgUrl: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/04/10/35428890/b4f8e7f2b2567f1bfadb35aeb75ab701_4152563926120982810.png?x-oss-process=image%2Fformat%2Cwebp'  },
            'Electro Abyss Mage': { Physical: 10, Anemo: 10, Geo: 10, Electro: 50, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: ['Electro Shield'], imgUrl: 'https://upload-static.hoyoverse.com/hoyolab-wiki/2023/04/10/35428890/b4f8e7f2b2567f1bfadb35aeb75ab701_4152563926120982810.png?x-oss-process=image%2Fformat%2Cwebp'  },
            'Blazing Axe Mitachurl': { Physical: 10, Anemo: 10, Geo: 10, Electro: 10, Hydro: 10, Pyro: 10, Cryo: 10, Dendro: 10, advantage: [], disadvantage: [], imgUrl: 'https://wiki.hoyolab.com/_ipx/f_webp/https://bbs.hoyolab.com/hoyowiki/picture/enemy/Blazing%2520Axe%2520Mitachurl_icon.png'  }
        };