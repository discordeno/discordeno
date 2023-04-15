import styled from 'styled-components'

export const Header = styled.div`
  background: url('/img/deno_background.png') repeat center center fixed;
  background-repeat: repeat;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0px;
    height: 10px;
    background: linear-gradient(
      0deg,
      var(--ifm-navbar-background-color),
      hsla(0, 0%, 7%, 0)
    );
    z-index: 2147483647;
    padding: 10px;
  }

  h1 {
    font-size: 4rem;
    font-weight: 900;
    color: var(--ifm-color-white);
    line-height: 1.25;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: var(--ifm-color-white);
    line-height: 1.25;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
`

export const HeaderCode = styled.div``

export const Highlight = styled.span`
  background: linear-gradient(135deg, #000, #443281, #443281, #7289da),
  repeating-linear-gradient(135deg, #000, #000 10px, #000 10px, #443281 20px);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-size: 600% 600%;
  animation: gradient 10s ease infinite;
  height: 100vh;
  -webkit-text-decoration-color: transparent;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}`

export const Button = styled.button<{
  variant: 'primary' | 'link'
}>`
  background: transparent;
  border: transparent;

  a {
    background: ${({ variant }) =>
      variant === 'primary' ? '#181818' : 'transparent'};
    color: ${({ variant }) => (variant === 'primary' ? '#fff' : 'primary')};
    animation: gradient 10s ease infinite;
    -webkit-text-decoration-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 900;
    border: 2px solid black;
    padding: 0.7rem 1.1rem;
    border-radius: 0.5rem;
    margin: 0.5rem;
    transition: all 0.3s ease-in-out;

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    :hover {
      background: ${({ variant }) =>
        variant === 'primary' ? '#0F0F0F' : 'transparent'};
      color: ${({ variant }) => (variant === 'primary' ? '#fff' : 'primary')};
      animation: gradient 10s ease infinite;
      -webkit-text-decoration-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: 900;
      border: 2px solid black;
      padding: 0.7rem 1.1rem;
      border-radius: 0.5rem;
      margin: 0.5rem;
      transition: all 0.3s ease-in-out;
    }
  }
`
export const HeaderBody = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const MainPage = styled.div`
  background: var(--ifm-navbar-background-color);
`

export const ReviewsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-left: 2vw;
  margin-right: 2vw;

  h1 {
    margin-top: 3rem;
    margin-bottom: 2rem;
    width: 100%;
    text-align: center;
    font-size: 3rem;
    font-weight: 900;
    color: var(--ifm-color-white);
    line-height: 1.25;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`

export const ReviewsElementWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(700px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(95vw, 1fr));
  }
`

export const ReviewsElement = styled.div`
  background: var(--ifm-footer-background-color);
  border-radius: 5px;
  height: 240px;
  padding: 32px 40px;
  position: relative;
`

export const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ReviewsRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--ifm-color-white);

  div {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const ReviewsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  div {
    #sub_header {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      color: var(--ifm-color-white);

      #username {
        margin-left: 0.3rem;
        font-size: 1rem;
        font-weight: 900;
      }

      #discriminator {
        font-size: 0.8rem;
        color: lightgray;
        font-weight: 900;
        margin-left: 0.1rem;
        margin-top: 3px;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    color: var(--ifm-color-white);

    #username {
      font-size: 1.5rem;
      font-weight: 900;
      line-height: 1;
    }

    #discriminator {
      font-size: 1rem;
      color: lightgray;
      font-weight: 900;
      margin-top: 0.4rem;
      margin-left: 0.3rem;
    }

    #badge {
      display: flex;
      align-items: center;
      background-color: #5865f2;
      font-size: 0.65em;
      margin-left: 5px;
      padding: 3px 4px;
      border-radius: 3px;
      line-height: 100%;
      text-transform: uppercase;

      svg {
        margin-right: 2px;
        width: 12px;
        height: 12px;
      }
    }
  }
`

export const ReviewsBox = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 80px;
  color: var(--ifm-color-white);
`

export const StarContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StarIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: ${props => (props.active ? 'currentColor' : '#CBD5E0')};
`

export const ReviewsOther = styled.div`
  margin-top: 7px;
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
`

export const ReviewsOtherContainer = styled.div`
  margin-top: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ifm-color-white);

  a {
    color: var(--ifm-color-white);
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    text-decoration: underline;

    svg {
      width: 20px;
      height: 20px;
    }

    :hover {
      color: lightblue;
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: capitalize;

    @media (max-width: 768px) {
      display: none;
    }

    strong {
      margin-left: 4px;
      margin-right: -2px;
    }
  }
`

export const FaqSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-left: 2vw;
  margin-right: 2vw;

  h1 {
    margin-top: 3rem;
    margin-bottom: 2rem;
    width: 100%;
    text-align: center;
    font-size: 3rem;
    font-weight: 900;
    color: var(--ifm-color-white);
    line-height: 1.25;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`

export const FaqContainer = styled.div`
  border: 1px solid var(--ifm-footer-background-color);
  border-radius: 5px;
  margin-bottom: 10px;
  width: 40vw;
  background-color: var(--ifm-footer-background-color);

  #rotated {
    transform: rotate(180deg);
  }

  @media (max-width: 1024px) {
    width: 90vw;
  }
`

export const FaqQuestion = styled.h3`
  cursor: pointer;
  padding: 10px;
  margin: 0;
  background-color: var(--ifm-footer-background-color);
  color: var(--ifm-color-white);
  user-select: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    fill: var(--ifm-color-white);
  }
`

export const FaqAnswer = styled.div`
  padding: ${({ visible }) => (visible ? '10px' : '0px')};
  background-color: var(--ifm-footer-background-color);
  color: #fff;
  height: ${({ visible }) => (visible ? 'auto' : '0px')};
  overflow: hidden;
  transition: height 0.3s;
`
