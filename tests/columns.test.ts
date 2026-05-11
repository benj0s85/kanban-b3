import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { Column } from '../src/models/Column';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = createApp();

describe('Tests d\'intégration - Routes Columns', () => {
  let token: string;

  beforeAll(async () => {
    await Column.deleteMany({});
    
    const secret = process.env.JWT_SECRET || 'test-secret';
    token = jwt.sign({ userId: new mongoose.Types.ObjectId() }, secret, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await Column.deleteMany({});
  });

  describe('GET /api/columns', () => {
    it('devrait retourner une liste vide au départ et un code 200', async () => {
      const response = await request(app)
        .get('/api/columns')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('POST /api/columns', () => {
    it('devrait créer une colonne, l\'insérer en base et retourner la structure JSON', async () => {
      const newColumn = { name: 'Nouvelle Colonne', position: 1 };

      const response = await request(app)
        .post('/api/columns')
        .set('Authorization', `Bearer ${token}`)
        .send(newColumn);

      expect([200, 201]).toContain(response.statusCode);
      
      const columnData = response.body.data || response.body;

      expect(columnData).toHaveProperty('_id');
      expect(columnData.name).toBe(newColumn.name);

      const columnInDb = await Column.findById(columnData._id);
      expect(columnInDb).not.toBeNull();
      expect((columnInDb as any)?.name).toBe(newColumn.name);
    });
  });
});