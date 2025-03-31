<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EpsSeeder extends Seeder
{
    public function run(): void
    {
        $eps = [
            ['code' => 'EPS001', 'mobility_code' => 'EPSS01', 'name' => 'ALIANSALUD EPS', 'nit' => '830113831', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPSI04', 'mobility_code' => 'EPSIC4', 'name' => 'ANAS WAYUU EPSI', 'nit' => '839000495', 'regime' => 'SUBSIDIADO'],
            ['code' => 'ESS062', 'mobility_code' => 'ESSC62', 'name' => 'ASMET SALUD', 'nit' => '900935126', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EPSI03', 'mobility_code' => 'EPSIC3', 'name' => 'ASOCIACION INDIGENA DEL CAUCA EPSI', 'nit' => '817001773', 'regime' => 'SUBSIDIADO'],
            ['code' => 'CCF055', 'mobility_code' => 'CCFC55', 'name' => 'CAJACOPI ATLANTICO', 'nit' => '890102044', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EPSS34', 'mobility_code' => 'EPSC34', 'name' => 'CAPITAL SALUD EPS-S', 'nit' => '900298372', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EPS025', 'mobility_code' => 'EPSC25', 'name' => 'CAPRESOCA', 'nit' => '891856000', 'regime' => 'SUBSIDIADO'],
            ['code' => 'CCF102', 'mobility_code' => 'CCFC20', 'name' => 'COMFACHOCO', 'nit' => '891600091', 'regime' => 'SUBSIDIADO'],
            ['code' => 'CCF050', 'mobility_code' => 'CCFC50', 'name' => 'COMFAORIENTE', 'nit' => '890500675', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EPS012', 'mobility_code' => 'EPSS12', 'name' => 'COMFENALCO VALLE', 'nit' => '890303093', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPS008', 'mobility_code' => 'EPSS08', 'name' => 'COMPENSAR EPS', 'nit' => '860066942', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'ESS024 - EPS042', 'mobility_code' => 'ESSC24 - EPSS42', 'name' => 'COOSALUD EPS-S', 'nit' => '900226715', 'regime' => 'AMBOS REGÍMENES'],
            ['code' => 'EPSI01', 'mobility_code' => 'EPSIC1', 'name' => 'DUSAKAWI EPSI', 'nit' => '824001398', 'regime' => 'SUBSIDIADO'],
            ['code' => 'ESS118', 'mobility_code' => 'ESSC18', 'name' => 'EMSSANAR E.S.S.', 'nit' => '901021565', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EAS016', 'mobility_code' => null, 'name' => 'EPM - EMPRESAS PUBLICAS DE MEDELLIN', 'nit' => '890904996', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'CCF033', 'mobility_code' => 'CCFC33', 'name' => 'EPS FAMILIAR DE COLOMBIA', 'nit' => '901543761', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EPS005', 'mobility_code' => 'EPSS05', 'name' => 'EPS SANITAS', 'nit' => '800251440', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPS010', 'mobility_code' => 'EPSS10', 'name' => 'EPS SURA', 'nit' => '800088702', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPS017', 'mobility_code' => 'EPSS17', 'name' => 'FAMISANAR', 'nit' => '830003564', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EAS027', 'mobility_code' => null, 'name' => 'FONDO DE PASIVO SOCIAL DE FERROCARRILES', 'nit' => '800112806', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPSI05', 'mobility_code' => 'EPSIC5', 'name' => 'MALLAMAS EPSI', 'nit' => '837000084', 'regime' => 'SUBSIDIADO'],
            ['code' => 'ESS207 - EPS048', 'mobility_code' => 'ESSC07 - EPSS48', 'name' => 'MUTUAL SER', 'nit' => '806008394', 'regime' => 'AMBOS REGÍMENES'],
            ['code' => 'No Aplica', 'mobility_code' => null, 'name' => 'No Aplica', 'nit' => null, 'regime' => 'No Aplica'],
            ['code' => 'EPS037 - EPSS41', 'mobility_code' => 'EPSS37 - EPS041', 'name' => 'NUEVA EPS', 'nit' => '900156264', 'regime' => 'AMBOS REGÍMENES'],
            ['code' => 'EPSI06', 'mobility_code' => 'EPSIC6', 'name' => 'PIJAOS SALUD EPSI', 'nit' => '809008362', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EPS047', 'mobility_code' => 'EPSS47', 'name' => 'SALUD BOLIVAR EPS SAS', 'nit' => '901438242', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPS046', 'mobility_code' => 'EPSS46', 'name' => 'SALUD MIA', 'nit' => '900914254', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPS002', 'mobility_code' => 'EPSS02', 'name' => 'SALUD TOTAL EPS S.A.', 'nit' => '800130907', 'regime' => 'CONTRIBUTIVO'],
            ['code' => 'EPSS40', 'mobility_code' => 'EPS040', 'name' => 'SAVIA SALUD EPS', 'nit' => '900604350', 'regime' => 'SUBSIDIADO'],
            ['code' => 'EPS018', 'mobility_code' => 'EPSS18', 'name' => 'SERVICIO OCCIDENTAL DE SALUD EPS SOS', 'nit' => '805001157', 'regime' => 'CONTRIBUTIVO'],
        ];

        DB::table('eps')->insert($eps);
    }
} 