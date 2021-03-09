import React from "react";
import styled from "styled-components";
// Components
import { Link as ReactRouterDOMLink } from "react-router-dom";
// Types
import { LinkProps } from "react-router-dom";
import { RoutePaths } from "../../../types/routes";

interface StyledLinkProps extends LinkProps {
  underline?: boolean;
  to: RoutePaths;
}

const Link: React.FC<StyledLinkProps> = ({
  underline,
  children,
  ...props
}) => {
  return <ReactRouterDOMLink {...props}>{children}</ReactRouterDOMLink>;
};

export const StyledLink = styled.p<{ underline?: boolean }>`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: ${({ underline }) =>
    underline ? "underline" : "none"};
  margin: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    font-weight: bold;
  }
`;

export const StyledReactRouterLink = styled(Link)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: ${({ underline }) =>
    underline ? "underline" : "none"};
  margin: 10px;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    font-weight: bold;
  }
`;
