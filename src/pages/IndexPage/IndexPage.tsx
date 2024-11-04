import { Section, List, Caption, Input, Button } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';

import { Page } from '@/components/Page.tsx';

const resStatus = [
  { color: 'blue', text: '16 и менее - Выраженный дефицит массы тела' },
  { color: 'lightblue', text: '16,5-18,5 - Недостаточная (дефицит) масса тела' },
  { color: 'green', text: '18,5-25 - Норма' },
  { color: 'lime', text: '25-30 - Избыточная масса тела (предожирение)' },
  { color: 'yellow', text: '30-35 - Ожирение 1 степени' },
  { color: 'orange', text: '35-40 - Ожирение 2 степени' },
  { color: 'red', text: '40 и более - Ожирение 3 степени' }
]

export const IndexPage: FC = () => {
  const [height, setHeight] = useState('180')
  const [weight, setWeight] = useState('75')
  const [res, setRes] = useState(-1)
  const [resText, setResText] = useState<any>(null)

  const changeHeight = (e: any) => {
    setHeight(String(parseInt(e.target.value)))
  }

  const changeWeight = (e: any) => {
    setWeight(String(parseInt(e.target.value)))
  }

  const calc = () => {
    const h = parseInt(height)
    const w = parseInt(weight)
    const c = 10000 * w / (h * h)
    console.log(c)
    setRes(Number((c).toFixed(2)))

    if (c <= 16) setResText(resStatus[0])
    if (16 <= c && c <= 18.5) setResText(resStatus[1])
    if (18.5 <= c && c <= 25) setResText(resStatus[2])
    if (25 <= c && c <= 30) setResText(resStatus[3])
    if (30 <= c && c <= 35) setResText(resStatus[4])
    if (35 <= c && c <= 40) setResText(resStatus[5])
    if (40 <= c) setResText(resStatus[6])
  }

  return (
    <Page back={false}>
      <List>
        <Section
          header="Расчёт индекса массы тела (ИМТ)"
        >
          <Caption>
            Данное приложение позволит вам узнать, в какой форме вы сейчас находитесь! <br />
            Для этого введите ваш рост и вес!
          </Caption>

        </Section>
        <Section
          header="Введите ваш рост (см)"
        >
          <Input value={height} type="number" placeholder='180' after="см" onChange={e => changeHeight(e)} />
        </Section>
        <Section
          header="Введите ваш вес (кг)"
        >
          <Input value={weight} type="number" placeholder='80' after="кг" onChange={e => changeWeight(e)} />
        </Section>
        <Button onClick={calc} stretched={true}>Рассчитать!</Button>

        {res !== -1 && <Section
          header="Ваш результат"
        >
          <Caption>
            ИМТ - {res} <br />
            <p style={{color: resText?.color}}>{resText?.text}</p>
          </Caption>
        </Section>}
      </List>
    </Page>
  );
};
