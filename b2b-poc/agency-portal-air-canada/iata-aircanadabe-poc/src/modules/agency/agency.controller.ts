import { Controller, Get, Body, Patch } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a agency with ID',
  })
  findOne(): Promise<boolean> {
    return this.agencyService.findOne();
  }

  @Patch()
  @ApiOperation({
    summary: 'Update agency',
  })
  update(@Body() updateAgencyDto: UpdateAgencyDto): Promise<boolean> {
    return this.agencyService.update(updateAgencyDto);
  }
}
