import { expect } from 'chai'
import { describe, it } from 'mocha'
import { EmbedsBuilder } from '../src/builders.js'

describe('builders/embeds.ts', () => {
  it('should create a new blank embed JSON', () => {
    expect(new EmbedsBuilder().newEmbed()).to.eql([{}])
  })

  it('should set the author name in the embed JSON', () => {
    expect(new EmbedsBuilder().setAuthor('Author')).to.eql([{ author: { name: 'Author' } }])
  })

  it('should set the color in the embed JSON', () => {
    expect(new EmbedsBuilder().setColor('#000000')).to.eql([{ color: 0 }])
    expect(new EmbedsBuilder().setColor('#21fa99')).to.eql([{ color: 2226841 }])
    expect(new EmbedsBuilder().setColor('#thisisnotacolor')).to.eql([{ color: 0 }])
    expect(new EmbedsBuilder().setColor(13530)).to.eql([{ color: 13530 }])
  })

  it('should set the description in the embed JSON', () => {
    expect(new EmbedsBuilder().setDescription('My Description')).to.eql([{ description: 'My Description' }])
  })

  it('should set the fields in the embed JSON', () => {
    expect(
      new EmbedsBuilder().setFields([
        { name: 'firstname', value: 'firstvalue' },
        { name: 'secondname', value: 'secondvalue', inline: true },
      ]),
    ).to.eql([
      {
        fields: [
          { name: 'firstname', value: 'firstvalue' },
          { name: 'secondname', value: 'secondvalue', inline: true },
        ],
      },
    ])
  })

  it('should set the footer text in the embed JSON', () => {
    expect(new EmbedsBuilder().setFooter('footer text')).to.eql([{ footer: { text: 'footer text' } }])
  })

  it('should set the set a random color in the embed JSON', () => {
    expect(new EmbedsBuilder().setRandomColor()[0]).to.haveOwnProperty('color')
  })

  it('should set the timestamp in the embed JSON', () => {
    const now = new Date()

    expect(new EmbedsBuilder().setTimestamp(now)).to.eql([{ timestamp: now.toISOString() }])
  })

  it('should set the title in the embed JSON', () => {
    expect(new EmbedsBuilder().setTitle('My Title')).to.eql([{ title: 'My Title' }])
  })

  it('should set the url in the embed JSON', () => {
    expect(new EmbedsBuilder().setUrl('https://google.com')).to.eql([{ url: 'https://google.com' }])
  })
})
