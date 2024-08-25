<!-- src/components/WaterAnalysisForm.vue -->
<template>
  <div class="container">
    <h2>Análise de Água</h2>
    <form @submit.prevent="submitForm">

      <!-- Perguntas com checkboxes -->
      <div class="question" v-for="(question, index) in questions" :key="index">
        <label>
          <input type="checkbox" :name="`question${index + 1}`" v-model="formData[`question${index + 1}`]"> {{ question }}
        </label>
      </div>

      <!-- Campos para inserção de valores dos parâmetros -->
      <h2>Análise de Qualidade da Água</h2>

      <h3>I - Condições da Água</h3>
      <div v-for="(param, index) in waterConditions" :key="index" class="form-group">
        <label :for="param.name">{{ param.label }}:</label>
        <input type="text" :id="param.name" v-model="formData[param.name]" required>
      </div>

      <h3>II - Padrões de Qualidade de Água</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Parâmetros</th>
            <th>Valor</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(param, index) in waterQualityStandards" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ param.label }}</td>
            <td><input type="text" v-model="formData[param.name]" required></td>
            <td>{{ param.unit }}</td>
          </tr>
        </tbody>
      </table>

      <h3>III - Padrões para Corpos de Água com Pesca ou Cultivo Intensivo</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Parâmetros</th>
            <th>Valor</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(param, index) in fishingStandards" :key="index">
            <td>{{ param.id }}</td>
            <td>{{ param.label }}</td>
            <td><input type="text" v-model="formData[param.name]" required></td>
            <td>{{ param.unit }}</td>
          </tr>
        </tbody>
      </table>

      <!-- <button type="submit">Enviar</button> -->
      <div class="form-group">
        <button type="submit">SubmEnviarit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../axios'; 

export default {
  data() {
    return {
      formData: {},
      questions: [
        "Não verificação de efeito tóxico crônico a organismos, de acordo com os critérios estabelecidos pelo órgão ambiental competente",
        "Não verificação de efeito tóxico agudo a organismos, de acordo com os critérios estabelecidos pelo órgão ambiental competente, ou, na sua ausência, por instituições nacionais ou internacionais renomadas",
        "Materiais flutuantes, inclusive espumas não naturais: virtualmente ausentes",
        "Óleos e graxas: virtualmente ausentes",
        "Substâncias que comuniquem gosto ou odor: virtualmente ausentes",
        "Corantes provenientes de fontes antrópicas: virtualmente ausentes",
        "Resíduos sólidos objetáveis: virtualmente ausentes",
        "Cor verdadeira: nível de cor natural do corpo de água em mg Pt/L",
        "Não tem presença de corantes provenientes de fontes antrópicas que não sejam removíveis por processo de coagulação, sedimentação e filtração convencionais",
        "Coliformes termotolerantes para o uso de recreação de contato primário deverão ser obedecidos os padrões de qualidade de balneabilidade, previstos na Resolução CONAMA n° 274, de 2000. Para os demais usos, não deverá ser excedido um limite de 200 coliformes termotolerantes por 100 mililitros em 80% ou mais, de pelo menos 6 amostras, coletadas durante o período de um ano, com frequência bimestral.",
        "Coliformes termotolerantes: para uso de recreação de contato primário deverá ser obedecida a Resolução CONAMA n° 274, de 2000. Para os demais usos, não deverá ser excedido um limite de 1.000 coliformes termotolerantes por 100 mililitros em 80% ou mais de pelo menos 6 amostras, coletadas durante o período de um ano, com frequência bimestral.",
        "Coliformes termotolerantes: para o uso de recreação de contato secundário não deverá ser excedido um limite de 2500 coliformes termotolerantes por 100 mililitros em 80% ou mais de pelo menos 6 amostras, coletadas durante o período de um ano, com frequência bimestral.",
        "Cianobactérias para dessedentação de animais: os valores de densidade de cianobactérias não deverão exceder 50.000 cel/mL, ou 5mm3/L",
        "Odor e aspecto: não objetáveis",
        "Óleos e graxas: toleram-se iridescências",
        "Substâncias facilmente sedimentáveis que contribuam para o assoreamento de canais de navegação: virtualmente ausentes",
        "Fenóis totais (substâncias que reagem com 4 - aminoantipirina) até 1,0 mg/L de C6H5OH",
        "Substâncias que produzem odor e turbidez: virtualmente ausentes",
        "Coliformes termotolerantes: para o uso de recreação de contato primário deverá ser obedecida a Resolução CONAMA n° 274, de 2000. Para o cultivo de moluscos bivalves destinados à alimentação humana, a média geométrica da densidade de coliformes termotolerantes, de um mínimo de 15 amostras coletadas no mesmo local, não deverá exceder 43 por 100 mililitros, e o percentil 90% não deverá ultrapassar 88 coliformes termotolerantes por 100 mililitros.",
        "Coliformes termotolerantes: não deverá ser excedido um limite de 2500 por 100 mililitros em 80% ou mais de pelo menos 6 amostras coletadas durante o período de um ano, com frequência bimestral",
        "Coliformes termotolerantes: não deverá ser excedido um limite de 4.000 coliformes termotolerantes por 100 mililitros em 80% ou mais de pelo menos 6 amostras coletadas durante o período de um ano, com frequência bimestral"
      ],
      waterConditions: [
        { name: 'salinity', label: 'Salinidade da Água (g/kg)' },
        { name: 'dbo', label: 'DBO 5 dias a 20°C (mg/L O2)' },
        { name: 'od', label: 'OD (mg/L O2)' },
        { name: 'turbidity', label: 'Turbidez (UNT)' },
        { name: 'ph', label: 'pH' },
        { name: 'trueColor', label: 'Cor Verdadeira (mg Pt/L)' },
        { name: 'chlorophyll', label: 'Clorofila a (µg/L)' },
        { name: 'cyanobacteriaDensity', label: 'Densidade de Cianobactérias (cel/mL)' },
        { name: 'totalPhosphorus', label: 'Fósforo Total (mg/L)' },
        { name: 'organicCarbon', label: 'Carbono Orgânico Total (mg/L)' }
      ],
      waterQualityStandards: [
      { "name": "clorofila_a", "label": "Clorofila a", "unit": "µg/L" },
      { "name": "cyanobacterias", "label": "Cianobactérias", "unit": "cel/mL" },
      { "name": "solidos_dissovildos_totais", "label": "Sólidos dissolvidos totais", "unit": "mg/L" },
      { "name": "aluminio_dissolvido", "label": "Alumínio dissolvido", "unit": "mg/L Al" },
      { "name": "antimonio", "label": "Antimônio", "unit": "mg/L Sb" },
      { "name": "arsenio_total", "label": "Arsênio total", "unit": "mg/L As" },
      { "name": "bario_total", "label": "Bário total", "unit": "mg/L Ba" },
      { "name": "berilio_total", "label": "Berílio total", "unit": "mg/L Be" },
      { "name": "boro_total", "label": "Boro total", "unit": "mg/L B" },
      { "name": "cadmio_total", "label": "Cádmio total", "unit": "mg/L Cd" },
      { "name": "chumbo_total", "label": "Chumbo total", "unit": "mg/L Pb" },
      { "name": "cianeto_livre", "label": "Cianeto livre", "unit": "mg/L CN" },
      { "name": "cloreto_total", "label": "Cloreto total", "unit": "mg/L Cl" },
      { "name": "cloro_residual_total", "label": "Cloro residual total (combinado + livre)", "unit": "mg/L Cl" },
      { "name": "cobalto_total", "label": "Cobalto total", "unit": "mg/L Co" },
      { "name": "cobre_dissolvido", "label": "Cobre dissolvido", "unit": "mg/L Cu" },
      { "name": "cromo_total", "label": "Cromo total", "unit": "mg/L Cr" },
      { "name": "ferro_dissolvido", "label": "Ferro dissolvido", "unit": "mg/L Fe" },
      { "name": "fluoreto_total", "label": "Fluoreto total", "unit": "mg/L F" },
      { "name": "fosforo_total_lentico", "label": "Fósforo total (ambiente lêntico)", "unit": "mg/L P" },
      { "name": "fosforo_total_intermediario", "label": "Fósforo total (ambiente intermediário, com tempo de residência entre 2 e 40 dias, e tributários diretos de ambiente lêntico)", "unit": "mg/L P" },
      { "name": "fosforo_total_lotico", "label": "Fósforo total (ambiente lótico e tributários de ambientes intermediários)", "unit": "mg/L P" },
      { "name": "litio_total", "label": "Lítio total", "unit": "mg/L Li" },
      { "name": "manganes_total", "label": "Manganês total", "unit": "mg/L Mn" },
      { "name": "mercurio_total", "label": "Mercúrio total", "unit": "mg/L Hg" },
      { "name": "niquel_total", "label": "Níquel total", "unit": "mg/L Ni" },
      { "name": "nitrato", "label": "Nitrato", "unit": "mg/L N" },
      { "name": "nitrito", "label": "Nitrito", "unit": "mg/L N" },
      { "name": "nitrogenio_amoniacal_total", "label": "Nitrogênio amoniacal total", "unit": "mg/L N" },
      { "name": "polifosfatos", "label": "Polifosfatos (determinado pela diferença entre fósforo ácido hidrolisável total e fósforo reativo total)", "unit": "mg/L" },
      { "name": "prata_total", "label": "Prata total", "unit": "mg/L Ag" },
      { "name": "selenio_total", "label": "Selênio total", "unit": "mg/L Se" },
      { "name": "sulfato_total", "label": "Sulfato total", "unit": "mg/L SO4" },
      { "name": "sulfeto", "label": "Sulfeto (H2S não dissociado)", "unit": "mg/L S" },
      { "name": "talio_total", "label": "Tálio total", "unit": "mg/L Tl" },
      { "name": "uranio_total", "label": "Urânio total", "unit": "mg/L U" },
      { "name": "vanadio_total", "label": "Vanádio total", "unit": "mg/L V" },
      { "name": "zinco_total", "label": "Zinco total", "unit": "mg/L Zn" },
      { "name": "acrilamida", "label": "Acrilamida", "unit": "µg/L" },
      { "name": "alacloro", "label": "Alacloro", "unit": "µg/L" },
      { "name": "aldrin_dieldrin", "label": "Aldrin + Dieldrin", "unit": "µg/L" },
      { "name": "atrazina", "label": "Atrazina", "unit": "µg/L" },
      { "name": "benzeno", "label": "Benzeno", "unit": "mg/L" },
      { "name": "benzidina", "label": "Benzidina", "unit": "µg/L" },
      { "name": "benzo_a_antraceno", "label": "Benzo (a) antraceno", "unit": "µg/L" },
      { "name": "benzo_a_pireno", "label": "Benzo (a) pireno", "unit": "µg/L" },
      { "name": "benzo_b_fluoranteno", "label": "Benzo(b) fluoranteno", "unit": "µg/L" },
      { "name": "benzo_k_fluoranteno", "label": "Benzo(k) fluoranteno", "unit": "µg/L" },
      { "name": "carbaril", "label": "Carbaril", "unit": "µg/L" },
      { "name": "clordano", "label": "Clordano (cis + trans)", "unit": "µg/L" },
      { "name": "2_clorofenol", "label": "2-Clorofenol", "unit": "µg/L" },
      { "name": "criseno", "label": "Criseno", "unit": "µg/L" },
      { "name": "2_4_d", "label": "2,4-D", "unit": "µg/L" },
      { "name": "demeton", "label": "Demeton (Demeton-O + Demeton-S)", "unit": "µg/L" },
      { "name": "dibenzo_a_h_antraceno", "label": "Dibenzo (a,h) antraceno", "unit": "µg/L" },
      { "name": "1_2_dicloroetano", "label": "1,2-Dicloroetano", "unit": "mg/L" },
      { "name": "1_1_dicloroeteno", "label": "1,1-Dicloroeteno", "unit": "mg/L" },
      { "name": "2_4_diclorofenol", "label": "2,4-Diclorofenol", "unit": "µg/L" },
      { "name": "3_3_diclorobenzidina", "label": "3,3-Diclorobenzidina", "unit": "µg/L" },
      { "name": "diclorometano", "label": "Diclorometano", "unit": "mg/L" },
      { "name": "ddt", "label": "DDT (p,p'-DDT + p,p'-DDE + p,p'-DDD)", "unit": "µg/L" },
      { "name": "dodecacloro_pentaciclodecano", "label": "Dodecacloro pentaciclodecano", "unit": "µg/L" },
      { "name": "endossulfan", "label": "Endossulfan (a + b + sulfato)", "unit": "µg/L" },
      { "name": "endrin", "label": "Endrin", "unit": "µg/L" },
      { "name": "estireno", "label": "Estireno", "unit": "mg/L" },
      { "name": "etilbenzeno", "label": "Etilbenzeno", "unit": "µg/L" },
      { "name": "fenois_totais", "label": "Fenóis totais (substâncias que reagem com 4-aminoantipirina)", "unit": "mg/L C6H5OH" },
      { "name": "glifosato", "label": "Glifosato", "unit": "µg/L" },
      { "name": "gution", "label": "Gution", "unit": "µg/L" },
      { "name": "heptacloro_epoxido", "label": "Heptacloro epóxido + Heptacloro", "unit": "µg/L" },
      { "name": "hexaclorobenzeno", "label": "Hexaclorobenzeno", "unit": "µg/L" },
      { "name": "indeno_1_2_3_cd_pireno", "label": "Indeno (1,2,3-cd) pireno", "unit": "µg/L" },
      { "name": "lindano", "label": "Lindano (g-HCH)", "unit": "µg/L" },
      { "name": "malation", "label": "Malation", "unit": "µg/L" },
      { "name": "metolacloro", "label": "Metolacloro", "unit": "µg/L" },
      { "name": "metoxicloro", "label": "Metoxicloro", "unit": "µg/L" },
      { "name": "monoclorobenzeno", "label": "Monoclorobenzeno", "unit": "µg/L" },
      { "name": "paration", "label": "Paration", "unit": "µg/L" },
      { "name": "pcbs", "label": "PCBs - Bifenilas policloradas", "unit": "µg/L" },
      { "name": "pentaclorofenol", "label": "Pentaclorofenol", "unit": "mg/L" },
      { "name": "simazina", "label": "Simazina", "unit": "µg/L" },
      { "name": "substancias_tensoativas", "label": "Substâncias tensoativas que reagem com o azul de metileno", "unit": "mg/L LAS" },
      { "name": "2_4_5_t", "label": "2,4,5-T", "unit": "µg/L" },
      { "name": "tetracloreto_de_carbono", "label": "Tetracloreto de carbono", "unit": "mg/L" },
      { "name": "tetracloroeteno", "label": "Tetracloroeteno", "unit": "mg/L" },
      { "name": "tolueno", "label": "Tolueno", "unit": "µg/L" },
      { "name": "toxafeno", "label": "Toxafeno", "unit": "µg/L" },
      { "name": "2_4_5_tp", "label": "2,4,5-TP", "unit": "µg/L" },
      { "name": "tributilestanho", "label": "Tributilestanho", "unit": "µg/L TBT" },
      { "name": "triclorobenzeno", "label": "Triclorobenzeno (1,2,3-TCB + 1,2,4-TCB)", "unit": "mg/L" },
      { "name": "tricloroeteno", "label": "Tricloroeteno", "unit": "mg/L" },
      { "name": "2_4_6_triclorofenol", "label": "2,4,6-Triclorofenol", "unit": "mg/L" },
      { "name": "trifluralina", "label": "Trifluralina", "unit": "µg/L" },
      { "name": "xileno", "label": "Xileno", "unit": "µg/L" }
      ],
     fishingStandards: [
      { id: 95, name: 'arsenio_total', label: 'Arsênio total', unit: 'µg/L As' },
      { id: 96, name: 'benzidina', label: 'Benzidina', unit: 'µg/L' },
      { id: 97, name: 'benzo_a_antraceno', label: 'Benzo (a) antraceno', unit: 'µg/L' },
      { id: 98, name: 'benzo_a_pireno', label: 'Benzo (a) pireno', unit: 'µg/L' },
      { id: 99, name: 'benzo_b_fluoranteno', label: 'Benzo(b) fluoranteno', unit: 'µg/L' },
      { id: 100, name: 'benzo_k_fluoranteno', label: 'Benzo (k) fluoranteno', unit: 'µg/L' },
      { id: 101, name: 'criseno', label: 'Criseno', unit: 'µg/L' },
      { id: 102, name: 'dibenzo_ah_antraceno', label: 'Dibenzo (a,h) antraceno', unit: 'µg/L' },
      { id: 103, name: '3_3_diclorobenzidina', label: '3,3-Diclorobenzidina', unit: 'µg/L' },
      { id: 104, name: 'heptacloro_epoxido_heptacloro', label: 'Heptacloro epóxido + Heptacloro', unit: 'µg/L' },
      { id: 105, name: 'hexaclorobenzeno', label: 'Hexaclorobenzeno', unit: 'µg/L' },
      { id: 106, name: 'indeno_123_cd_pireno', label: 'Indeno (1,2,3-cd) pireno', unit: 'µg/L' },
      { id: 107, name: 'pcbs_bifenilas_policloradas', label: 'PCBs - Bifenilas policloradas', unit: 'µg/L' },
      { id: 108, name: 'pentaclorofenol', label: 'Pentaclorofenol', unit: 'µg/L' },
      { id: 109, name: 'tetracloreto_de_carbono', label: 'Tetracloreto de carbono', unit: 'µg/L' },
      { id: 110, name: 'tetracloroeteno', label: 'Tetracloroeteno', unit: 'µg/L' },
      { id: 111, name: 'toxafeno', label: 'Toxafeno', unit: 'µg/L' },
      { id: 112, name: '2_4_6_triclorofenol', label: '2,4,6-triclorofenol', unit: 'µg/L' },
      { id: 113, name: '2_clorofenol', label: '2-Clorofenol', unit: 'µg/L' },
      { id: 114, name: '2_4_diclorofenol', label: '2,4-Diclorofenol', unit: 'µg/L' },
      { id: 115, name: '1_2_dicloroetano', label: '1,2-Dicloroetano', unit: 'µg/L' },
      { id: 116, name: '1_1_dicloroeteno', label: '1,1-Dicloroeteno', unit: 'µg/L' }
    ]

    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('https:api/agua/tipo_agua/', this.formData);
        // Lidar com a resposta aqui, se necessário
        console.log('Formulário enviado com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
      }
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
