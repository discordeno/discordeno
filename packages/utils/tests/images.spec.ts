import { expect } from 'chai'
import { describe, it } from 'mocha'
import { avatarUrl, emojiUrl, formatImageUrl, getWidgetImageUrl, guildBannerUrl, guildIconUrl, guildSplashUrl } from '../src/images.js'

describe('images.ts', () => {
  describe('formatImageUrl function', () => {
    it('will return formated url with default size 128 and jpg', () => {
      expect(formatImageUrl('https://skillz.is.pro/image')).to.be.equal('https://skillz.is.pro/image.jpg?size=128')
    })

    it('will return formated url with given size', () => {
      expect(formatImageUrl('https://skillz.is.pro/image', 1024)).to.be.equal('https://skillz.is.pro/image.jpg?size=1024')
    })

    it('will return formated url with given size and format', () => {
      expect(formatImageUrl('https://skillz.is.pro/image', 1024, 'gif')).to.be.equal('https://skillz.is.pro/image.gif?size=1024')
    })

    it('will return formated url with default size and format', () => {
      expect(formatImageUrl('https://skillz.is.pro/image', undefined, 'gif')).to.be.equal('https://skillz.is.pro/image.gif?size=128')
    })

    describe('without format', () => {
      it('will use gif if a_ is found', () => {
        expect(formatImageUrl('https://cdn.discordapp.com/avatars/568505543511259840/a_482491d6dcf12e12746ccd3148f0c646')).to.be.equal(
          'https://cdn.discordapp.com/avatars/568505543511259840/a_482491d6dcf12e12746ccd3148f0c646.gif?size=128',
        )
      })

      it('will use jpg if no a_ is found', () => {
        expect(formatImageUrl('https://cdn.discordapp.com/avatars/568505543511259840/482491d6dcf12e12746ccd3148f0c646')).to.be.equal(
          'https://cdn.discordapp.com/avatars/568505543511259840/482491d6dcf12e12746ccd3148f0c646.jpg?size=128',
        )
      })
    })
  })

  describe('emojiUrl function', () => {
    it('can format emoji url with png as default ext', () => {
      expect(emojiUrl('1079823706743918622')).to.equal('https://cdn.discordapp.com/emojis/1079823706743918622.png')
    })

    it('can format emoji url with gif as ext', () => {
      expect(emojiUrl('1079584570661404724', true)).to.equal('https://cdn.discordapp.com/emojis/1079584570661404724.gif')
    })
  })

  describe('avatarUrl function', () => {
    it('will return the url for given avatar icon hash', () => {
      expect(
        avatarUrl('207324334904049664', '9130', {
          avatar: 'db26a6fb924c985f66b79364cf5797b7',
        }),
      ).to.equal('https://cdn.discordapp.com/avatars/207324334904049664/db26a6fb924c985f66b79364cf5797b7.jpg?size=128')
    })

    it('will return the url for given avatar icon bigint', () => {
      expect(
        avatarUrl('207324334904049664', '9130', {
          avatar: 4034407661299384404326332419647968090039n,
        }),
      ).to.equal('https://cdn.discordapp.com/avatars/207324334904049664/db26a6fb924c985f66b79364cf5797b7.jpg?size=128')
    })

    it('will return the url for default avatar', () => {
      expect(
        avatarUrl('207324334904049664', '9130', {
          avatar: undefined,
        }),
      ).to.equal('https://cdn.discordapp.com/embed/avatars/0.png')
    })
  })

  describe('guildBannerUrl function', () => {
    it("will return the url for given guild's banner's icon hash", () => {
      expect(guildBannerUrl('785384884197392384', { banner: '2fc0f64acd7a326e0c93c123db02eb1d' })).to.equal(
        'https://cdn.discordapp.com/banners/785384884197392384/2fc0f64acd7a326e0c93c123db02eb1d.jpg?size=128',
      )
    })

    it("will return the url for given guild's banner's icon big int", () => {
      expect(guildBannerUrl('785384884197392384', { banner: 3806581668328291509506503737571885116189n })).to.equal(
        'https://cdn.discordapp.com/banners/785384884197392384/2fc0f64acd7a326e0c93c123db02eb1d.jpg?size=128',
      )
    })

    it("will return the url for given guild's banner with format", () => {
      expect(guildBannerUrl('785384884197392384', { banner: '2fc0f64acd7a326e0c93c123db02eb1d', format: 'webp' })).to.equal(
        'https://cdn.discordapp.com/banners/785384884197392384/2fc0f64acd7a326e0c93c123db02eb1d.webp?size=128',
      )
    })

    it("will return the url for given guild's banner with size", () => {
      expect(guildBannerUrl('785384884197392384', { banner: '2fc0f64acd7a326e0c93c123db02eb1d', size: 256 })).to.equal(
        'https://cdn.discordapp.com/banners/785384884197392384/2fc0f64acd7a326e0c93c123db02eb1d.jpg?size=256',
      )
    })

    it('will return undefined without given banner', () => {
      expect(guildBannerUrl('785384884197392384', {})).to.equal(undefined)
    })
  })

  describe('guildIconUrl function', () => {
    it("will return the url for given guild's icon's icon hash", () => {
      expect(guildIconUrl('785384884197392384', '7cb67c989d54d824239b2bb4270955b1')).to.equal(
        'https://cdn.discordapp.com/icons/785384884197392384/7cb67c989d54d824239b2bb4270955b1.jpg?size=128',
      )
    })

    it("will return the url for given guild's icon's icon big int", () => {
      expect(guildIconUrl('785384884197392384', 3908877832746069276949504774836813649329n)).to.equal(
        'https://cdn.discordapp.com/icons/785384884197392384/7cb67c989d54d824239b2bb4270955b1.jpg?size=128',
      )
    })

    it("will return the url for given guild's icon with format", () => {
      expect(guildIconUrl('785384884197392384', '7cb67c989d54d824239b2bb4270955b1', { format: 'webp' })).to.equal(
        'https://cdn.discordapp.com/icons/785384884197392384/7cb67c989d54d824239b2bb4270955b1.webp?size=128',
      )
    })

    it("will return the url for given guild's icon with size", () => {
      expect(guildIconUrl('785384884197392384', '7cb67c989d54d824239b2bb4270955b1', { size: 256 })).to.equal(
        'https://cdn.discordapp.com/icons/785384884197392384/7cb67c989d54d824239b2bb4270955b1.jpg?size=256',
      )
    })

    it('will return undefined without given icon', () => {
      expect(guildIconUrl('785384884197392384', undefined)).to.equal(undefined)
    })
  })

  describe('guildSplashUrl function', () => {
    it("will return the url for given guild's splash's icon big hash", () => {
      expect(guildSplashUrl('785384884197392384', '207961ff6c41f119874e10efc602858c')).to.equal(
        'https://cdn.discordapp.com/splashes/785384884197392384/207961ff6c41f119874e10efc602858c.jpg?size=128',
      )
    })

    it("will return the url for given guild's splash's icon big int", () => {
      expect(guildSplashUrl('785384884197392384', 3786271587545740215322752847582515594636n)).to.equal(
        'https://cdn.discordapp.com/splashes/785384884197392384/207961ff6c41f119874e10efc602858c.jpg?size=128',
      )
    })

    it("will return the url for given guild's splash with format", () => {
      expect(guildSplashUrl('785384884197392384', '207961ff6c41f119874e10efc602858c', { format: 'webp' })).to.equal(
        'https://cdn.discordapp.com/splashes/785384884197392384/207961ff6c41f119874e10efc602858c.webp?size=128',
      )
    })

    it("will return the url for given guild's splash with size", () => {
      expect(guildSplashUrl('785384884197392384', '207961ff6c41f119874e10efc602858c', { size: 2048 })).to.equal(
        'https://cdn.discordapp.com/splashes/785384884197392384/207961ff6c41f119874e10efc602858c.jpg?size=2048',
      )
    })

    it('will return undefined without given icon', () => {
      expect(guildSplashUrl('785384884197392384', undefined)).to.equal(undefined)
    })
  })

  describe('getWidgetImageUrl function', () => {
    it("will return the url for given guild's widget", () => {
      expect(getWidgetImageUrl('785384884197392384')).to.equal('https://discordapp.com/api/guilds/785384884197392384/widget.png')
    })

    it("will return the url for given guild's widget with the style", () => {
      expect(getWidgetImageUrl('785384884197392384', { style: 'banner2' })).to.equal(
        'https://discordapp.com/api/guilds/785384884197392384/widget.png?style=banner2',
      )
    })
  })
})
