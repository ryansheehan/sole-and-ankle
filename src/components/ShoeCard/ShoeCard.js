import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>          
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' && <ReleaseBanner style={{'--background-color': COLORS.primary}}>Sale</ReleaseBanner>}     
          {variant === 'new-release' && <ReleaseBanner style={{'--background-color': COLORS.secondary}}>Just Released!</ReleaseBanner>}   
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            '--text-decoration': variant === 'on-sale' ? 'line-through' : 'revert'
          }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const ReleaseBanner = styled.div`
  color: ${COLORS.white};
  background-color: var(--background-color);
  position: absolute;
  top: 12px;
  right: -4px;
  height: 32px;
  text-align: center;
  padding: 8px;
  padding-top: 9px;
  font-size: 14px;
  font-weight: ${WEIGHTS.bold};
  line-height: 14px;
  border-radius: 2px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`  
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};  
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
