import { Palyer } from "./types.d";
import request from "@/utils/request";

export const defaultPlayerData: Palyer = {
  accountName: "",
  nickName: "",
  avatar: "",
  bravepoints: 0,
  exp: 0,
  id: 0,
  level: 0,
  rank: 0,
  wanttoplay: [],
  winningstreak: 0
};

export const getPlayers = (params: any) =>
  request({
    url: "/players",
    method: "get",
    params
  });

export const getPlayer = (id: number) =>
  request({
    url: `/players/${id}`,
    method: "get"
  });

export const updatePlayer = (id: number, data: any) =>
  request({
    url: `/players/${id}`,
    method: "put",
    data
  });

export const createPlayer = (data: any) =>
  request({
    url: `/players`,
    method: "post",
    data
  });

export const deletePlayer = (id: number) =>
  request({
    url: `/players/${id}`,
    method: "delete"
  });
