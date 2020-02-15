module.exports = {
    daily: [
        {
            id: 'claim4',
            name: 'Claim 4 cards today',
            desc: '',
            tier: 1,
            actions: ['claim', 'cl'],
            check: (ctx, user) => user.dailystats.claims >= 4,
            resolve: (ctx, user) => {
                user.exp += 400
            },
            reward: (ctx) => `**400** ${ctx.symbols.tomato}`
        }, {
            id: 'claim10',
            name: 'Claim 10 cards today',
            desc: '',
            tier: 2,
            actions: ['claim', 'cl'],
            check: (ctx, user) => user.dailystats.claims >= 10,
            resolve: (ctx, user) => {
                user.exp += 1000
            },
            reward: (ctx) => `**1000** ${ctx.symbols.tomato}`
        }, {
            id: 'bid2',
            name: 'Bid on 2 auctions today',
            desc: '',
            tier: 1,
            actions: ['auc', 'auction'],
            check: (ctx, user) => user.dailystats.bids >= 2,
            resolve: (ctx, user) => {
                user.exp += 400
            },
            reward: (ctx) => `**400** ${ctx.symbols.tomato}`
        }, {
            id: 'bid5',
            name: 'Bid on 5 auctions today',
            desc: '',
            tier: 2,
            actions: ['auc', 'auction'],
            check: (ctx, user) => user.dailystats.bids >= 5,
            resolve: (ctx, user) => {
                user.exp += 1000
            },
            reward: (ctx) => `**1000** ${ctx.symbols.tomato}`
        }, {
            id: 'sell2',
            name: 'Sell 2 cards on auction today',
            desc: '',
            tier: 1,
            actions: ['auc', 'auction'],
            check: (ctx, user) => user.dailystats.aucs >= 2,
            resolve: (ctx, user) => {
                user.exp += 400
            },
            reward: (ctx) => `**400** ${ctx.symbols.tomato}`
        }, {
            id: 'sell5',
            name: 'Sell 5 cards on auction today',
            desc: '',
            tier: 2,
            actions: ['auc', 'auction'],
            check: (ctx, user) => user.dailystats.aucs >= 5,
            resolve: (ctx, user) => {
                user.vials += 20
            },
            reward: (ctx) => `**20** ${ctx.symbols.vial}`
        }, {
            id: 'forge1',
            name: 'Forge 1-star card',
            desc: '',
            tier: 1,
            actions: ['forge'],
            check: (ctx, user) => user.dailystats.forge1 >= 1,
            resolve: (ctx, user) => {
                user.exp += 200
            },
            reward: (ctx) => `**200** ${ctx.symbols.tomato}`
        }, {
            id: 'forge2',
            name: 'Forge 2-star card',
            desc: '',
            tier: 1,
            actions: ['forge'],
            check: (ctx, user) => user.dailystats.forge2 >= 1,
            resolve: (ctx, user) => {
                user.exp += 300
            },
            reward: (ctx) => `**300** ${ctx.symbols.tomato}`
        }, {
            id: 'forge3',
            name: 'Forge 3-star card',
            desc: '',
            tier: 2,
            actions: ['forge'],
            check: (ctx, user) => user.dailystats.forge3 >= 1,
            resolve: (ctx, user) => {
                user.vials += 20
            },
            reward: (ctx) => `**20** ${ctx.symbols.vial}`
        },
    ],

    getting_started: [],

    upgrade_time: []
}