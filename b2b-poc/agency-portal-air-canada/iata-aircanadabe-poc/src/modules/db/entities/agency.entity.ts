import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('agencies')
export class AgencyEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the property credential',
    required: true,
  })
  id?: number;

  @Column('text')
  @ApiProperty({
    example: 'XYZ Agency',
    description: 'The name of the agency',
  })
  agencyName: string;

  @Column('text')
  @ApiProperty({
    example: '987-654-3210',
    description: 'Contact number of the agency itself',
  })
  agencyContactNo: string;

  @Column('text')
  @ApiProperty({
    example: '123 Agency St, Suite 100',
    description: 'Physical address of the agency',
  })
  agencyAddress: string;

  @Column('text', { nullable: true })
  @ApiProperty({
    example: ' 23346',
    description: 'Physical street address of the agency',
  })
  agencyStreetAddress?: string;

  @Column('text', { nullable: true })
  @ApiProperty({
    example: ' Boul de la Côte-Vertu',
    description: 'Physical street address of the agency',
  })
  agencyStreetName?: string;

  @Column('text')
  @ApiProperty({
    example: 'United States',
    description: 'Country where the agency is located',
  })
  agencyCountry: string;

  @Column('text')
  @ApiProperty({
    example: 'California',
    description: 'State where the agency is located',
  })
  agencyState: string;

  @Column('text')
  @ApiProperty({
    example: 'Los Angeles',
    description: 'City where the agency is located',
  })
  agencyCity: string;

  @Column('text')
  @ApiProperty({
    example: '90001',
    description: 'Postal code of the agency location',
  })
  agencyPostalCode: string;

  @Column('text')
  @ApiProperty({
    example: 'LAX',
    description: 'IATA code for the agency',
  })
  agencyIATACode: string;

  @Column('text')
  @ApiProperty({
    example: 'Toronto',
    description: 'IATA code country',
  })
  agencyIATACodeCountry: string;

  @Column('boolean', { default: false })
  @ApiProperty({
    example: true,
    description: 'is agency already registered',
  })
  isAgencyRegistered?: boolean;

  @Column('simple-array', { nullable: true })
  @ApiProperty({
    example: ['sdfsd23432534sdty45463643'],
  })
  agencyEmployeeIdpId?: string[];

  @CreateDateColumn({
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-12-03T11:05:02.540Z',
    description: 'The creation timestamp of the property credential',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-12-03T11:05:02.540Z',
    description: 'The last update timestamp of the property credential',
  })
  updatedAt?: Date;
}
