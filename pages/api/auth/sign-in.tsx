import { NextApiRequest, NextApiResponse } from "next";
import { GenericResponse } from "../../../models/generic-response";

export interface TokenResponse {
  token: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericResponse<TokenResponse>>
) {
  let body = JSON.parse(req.body);

  if (body.email == "admin" && body.password == "admin")
    return res.status(200).json({
      success: true,
      data: {
        token: "verysafetokenrightthere",
      },
    });

  res.status(401).json({
    success: false,
    message: "Login error message very very very long",
  });
}
