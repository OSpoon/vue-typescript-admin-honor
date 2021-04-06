import { Hero, Palyer } from "./../src/api/types.d";
import { Request, Response } from "express";
import { heros } from "./heros";
import faker from "faker";

faker.locale = "zh_CN";
const playerCount = 100;
const playerList: Palyer[] = [];

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountName: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(100000),
    level: faker.random.number(30),
    nickName: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay: getWanttoplay(),
    winningstreak: faker.random.number(10)
  });
}

function getWanttoplay() {
  let wanttoplay: Set<Hero> = new Set();
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)]);
  }
  return Array.from(wanttoplay);
}
export const getPlayers = (req: Request, res: Response) => {
  // 获取参数进行处理
  const { accountName, page = 1, limit = 10 } = req.query;

  // 匹配条件过滤
  let mockList = playerList.filter(item => {
    if (accountName && item.accountName.indexOf(accountName.toString()) < 0) {
      return false;
    }
    return true;
  });

  // 分页
  const pageList = mockList.filter((item, index) => {
    return (
      index < parseInt(limit.toString()) * parseInt(page.toString()) &&
      index >= parseInt(limit.toString()) * (parseInt(page.toString()) - 1)
    );
  });

  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  });
};

export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params;
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      });
    }
  }
  return res.json({
    code: 70001,
    message: "player not found"
  });
};

export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.body;
  return res.json({
    code: 20000,
    data: {
      player
    }
  });
};

export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params;
  const { player } = req.body;
  for (const v of playerList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      });
    }
  }
  return res.json({
    code: 70001,
    message: "player not found"
  });
};

export const deletePlayer = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  });
};
