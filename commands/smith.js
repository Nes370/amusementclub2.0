const {cmd}     = require('../utils/cmd')
const colors    = require('../utils/colors')
const _         = require('lodash')

const {
    formatName,
    addUserCard,
    withCards,
    withGlobalCards,
    bestMatch,
    removeUserCard,
    withMultiQuery
} = require('../modules/card')

const {
    evalCard, 
    getVialCost 
} = require('../modules/eval')

const {addConfirmation} = require('../utils/confirmator')

cmd(['forge'], withMultiQuery(async (ctx, user, cards, parsedargs) => {
    const card1 = bestMatch(cards[0])
    let card2 = bestMatch(cards[1])

    if(!card2 || card1.id === card2.id)
        card2 = bestMatch(cards[0].filter(x => x.id != card1.id))

    if(!card1 || !card2)
        return ctx.reply(user, `please specify **two cards** using \`,\` as separator`, 'red')

    if(card1.level != card2.level)
        return ctx.reply(user, `you can forge only cards of the same star count`, 'red')

    if(card1.level > 3)
        return ctx.reply(user, `you cannot forge cards higher than 3 ${ctx.symbols.star}`, 'red')

    const eval1 = await evalCard(ctx, card1)
    const eval2 = await evalCard(ctx, card2)
    const vialavg = (await getVialCost(ctx, card1, eval1) + await getVialCost(ctx, card2, eval2)) * .5
    const cost = Math.round((eval1 + eval2) * .25)
    const vialres = Math.round(vialavg * .5)

    if(user.exp < cost)
        return ctx.reply(user, `you need at least **${cost}** ${ctx.symbols.tomato} to forge these cards`, 'red')

    addConfirmation(ctx, user, 
        `Do you want to forge ${formatName(card1)} and ${formatName(card2)} using **${cost}** ${ctx.symbols.tomato}?
        You will get **${vialres}** ${ctx.symbols.vial} and a **${card1.level} ${ctx.symbols.star} card**`, null, 
        async (x) => {
            let res = ctx.cards.filter(x => x.level === card1.level && x.id != card1.id && x.id != card2.id)

            if(card1.col === card2.col)
                res = res.filter(x => x.col === card1.col)

            const newcard = _.sample(res)
            user.vials += vialres
            user.exp -= cost

            if(!newcard)
                return ctx.reply(user, `and error occured, please try again`, 'red')

            removeUserCard(user, card1.id)
            removeUserCard(user, card2.id)
            addUserCard(user, newcard.id)
            await user.save()

            return ctx.reply(user, {
                image: { url: newcard.url },
                color: colors.blue,
                description: `you got ${formatName(newcard)}!
                    **${vialres}** ${ctx.symbols.vial} were added to your account`
            })
        }, 
        (x) => ctx.reply(user, `forge operation was declined`, 'red'))
}))

cmd(['liq'], withCards(async (ctx, user, cards, parsedargs) => {
    const card = bestMatch(cards)
    const vials = Math.round((await getVialCost(ctx, card)) * .7)

    if(card.level > 3)
        return ctx.reply(user, `you cannot liquify card higher than 3 ${ctx.symbols.star}`, 'red')

    addConfirmation(ctx, user, 
        `Do you want to liquify ${formatName(card)} into **${vials}** ${ctx.symbols.vial}?`, null, 
        async (x) => {
            user.vials += vials
            removeUserCard(user, card.id)
            await user.save()

            ctx.reply(user, `card ${formatName(card)} was liquified. You got **${vials}** ${ctx.symbols.vial}
                You have **${user.vials}** ${ctx.symbols.vial}
                You can use vials to draw **any 1-3 ${ctx.symbols.star}** card that you want. Use \`->draw\``)
        }, 
        (x) => ctx.reply(user, `liquifying operation was declined`, 'red'), 
        `Resulting vials are not constant and can change depending on card popularity`)
}))

cmd(['draw'], withGlobalCards(async (ctx, user, cards, parsedargs) => {
    const card = bestMatch(cards)
    const vials = await getVialCost(ctx, card)

    if(card.level > 3)
        return ctx.reply(user, `you cannot draw card higher than 3 ${ctx.symbols.star}`, 'red')

    if(user.vials < vials)
        return ctx.reply(user, `you don't have enough vials to draw ${formatName(card)}
            You need **${vials}** ${ctx.symbols.vial} but you have **${user.vials}** ${ctx.symbols.vial}`, 'red')

    addConfirmation(ctx, user, 
        `Do you want to draw ${formatName(card)} using **${vials}** ${ctx.symbols.vial}?`, null, 
        async (x) => {
            user.vials -= vials
            addUserCard(user, card.id)
            await user.save()

            return ctx.reply(user, {
                image: { url: card.url },
                color: colors.blue,
                description: `you got ${formatName(card)}!
                    You have **${user.vials}** ${ctx.symbols.vial} remaining`
            })
        }, 
        (x) => ctx.reply(user, `card draw was declined`, 'red'))
}))